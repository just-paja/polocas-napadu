/* istanbul ignore file */
import babelConfig from '../../babel.config.js'
import dotenv from 'dotenv'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import WebpackDevServer from 'webpack-dev-server'
import webpack from 'webpack'

import { dirname, join, resolve } from 'path'
import { fileURLToPath } from 'url'
import { readFileSync, readdirSync } from 'fs'

const baseDir = dirname(fileURLToPath(import.meta.url))
const DEFAULT_PORT = 5001

dotenv.config()

const getSafeName = name => name.replace(/^@/, '').replace(/\//g, '-')

const getPackageDistDir = name => join(getDistDir(), getSafeName(name))

export const readManifest = packageDir =>
  JSON.parse(readFileSync(join(packageDir, 'package.json')))

export const getLocaleEntryPaths = (packageDir, prefix = '') => {
  const localesPath = resolve(packageDir, 'locales')
  return Array.from(readdirSync(localesPath, { withFileTypes: true }))
    .filter(entry => entry.isDirectory() && !entry.name.includes('__'))
    .reduce(
      (aggr, entry) => ({
        ...aggr,
        [[prefix, entry.name].filter(Boolean).join('-')]: resolve(
          localesPath,
          entry.name,
          'index.mjs'
        ),
      }),
      {}
    )
}

export const getMode = env =>
  env.NODE_ENV === 'production' ? 'production' : 'development'

export const getBabelConfig = () => ({
  test: /\.tsx?$/,
  loader: 'babel-loader',
  options: {
    presets: babelConfig.presets,
  },
})

export const getDistDir = () => resolve(baseDir, '..', '..', 'dist')

export const getEnvName = () => {
  if (process.env.BITBUCKET_BRANCH === 'master') {
    return 'STAGING'
  }
  if (process.env.BITBUCKET_TAG) {
    return 'PRODUCTION'
  }
  return null
}

export const getBranchVars = () => {
  const envName = getEnvName()
  const prefix = `${envName}_`
  const prefixed = Object.fromEntries(
    Object.entries(process.env)
      .map(([name, value]) =>
        name.startsWith(prefix) ? [name.substring(prefix.length), value] : null
      )
      .filter(Boolean)
  )
  return {
    ...process.env,
    ...prefixed,
  }
}

export const squashBranchVars = () => {
  process.env = getBranchVars()
}

export const getWebpackConfig = ({
  distDir,
  bundleName,
  entryPath,
  env,
  manifest,
  target = 'web',
}) => ({
  entry: entryPath,
  mode: getMode(env),
  experiments: {
    outputModule: true,
  },
  externals: { 'express': 'express' },
  externalsType: 'module',
  externalsPresets: { node: true },
  module: {
    rules: [
      getBabelConfig(),
      {
        test: /s[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|webm|webp)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  output: {
    chunkFormat: 'module',
    path: distDir || getPackageDistDir(manifest.name),
    filename: bundleName && `${bundleName}.js`,
  },
  plugins: [new webpack.EnvironmentPlugin(env)],
  target,
})

export const transpileScript = async ({ env, ...props }) => {
  const config = getWebpackConfig({
      ...props,
      env: {
        ...env,
        ...getBranchVars(),
        NODE_ENV: 'production',
      },
    })
  const compiler = webpack(config)
  return await new Promise((resolvePromise, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err)
      }
      const info = stats.toJson()
      if (stats.hasErrors()) {
        const statsErr = new Error()
        const src = info.errors[0]
        statsErr.message = src.message
        statsErr.stack = [
          `Module: ${src.moduleIdentifier}:${src.loc}`,
          src.stack,
        ].join('\n')
        return reject(statsErr)
      }
      compiler.close(closeErr => {
        if (closeErr) {
          reject(closeErr)
        }
      })
      if (!err) {
        return resolvePromise(stats)
      }
      return Promise.resolve()
    })
  })
}

export const createDevServer = webpackEnv => {
  const webpackConfig = getWebpackConfig(webpackEnv)
  const entryPath = resolve(baseDir, '..', webpackEnv.entryPathDev || webpackEnv.entryPath)

  const compilerConfig = {
    ...webpackConfig,
    entry: entryPath,
    plugins: [
      ...webpackConfig.plugins,
      new HtmlWebpackPlugin({}),
    ],
  }
  const compiler = webpack(compilerConfig)
  const devServerOptions = {
    open: false,
    port: process.env.NODE_PORT || webpackEnv.defaultPort || DEFAULT_PORT,
  }
  return new WebpackDevServer(devServerOptions, compiler)
}
