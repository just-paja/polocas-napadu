/* istanbul ignore file */
import babelConfig from '../../babel.config.js'
import dotenv from 'dotenv'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
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

/**
 * A shortcut to wait until webpack transiplation finishes
 * @param {WebpackCompiler} compiler
 * @async
 * @returns WebpackStats
 */
export const compile = async compiler =>
  await new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err)
      }
      const info = stats.toJson()
      if (stats.hasErrors()) {
        const statsErr = new Error()
        statsErr.message = info.errors[0].message
        statsErr.stack = info.errors[0].stack
        return reject(statsErr)
      }
      compiler.close(closeErr => {
        if (closeErr) {
          reject(closeErr)
        }
      })
      if (!err) {
        resolve(stats)
      }
      return null
    })
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
  return await compile(compiler)
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

export const getAssetLoader = () => ({
  test: /\.(webp|jpg|jpeg|otf|png|svg|wav|mp3)$/,
  type: 'asset/resource',
})

export const getSassLoader = nodeEnv => ({
  test: /s[ac]ss$/,
  use: [
    nodeEnv === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
    'css-loader',
    'resolve-url-loader',
    { loader: 'sass-loader', options: { sourceMap: true } },
  ],
})

export const getReactRules = nodeEnv => [
  {
    test: /\.mjs$/,
    resolve: {
      fullySpecified: false,
    },
  },
  {
    test: /\.m?jsx?$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
      ...babelConfig,
      plugins: [
        nodeEnv !== 'production' && 'react-refresh/babel',
        '@babel/plugin-proposal-export-default-from',
      ].filter(Boolean),
    },
  },
  getSassLoader(nodeEnv),
  getAssetLoader(nodeEnv),
]

export const getReactPlugins = ({ env, template }) =>
  [
    env.NODE_ENV !== 'production' && new ReactRefreshWebpackPlugin(),
    new webpack.EnvironmentPlugin(env),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template,
    }),
  ].filter(Boolean)


export const getReactConfig = ({ env, template }) => ({
  plugins: getReactPlugins({ env, template }),
  rules: getReactRules(env.NODE_ENV),
})

const getDefaultEnv = () => ({
  apiUrl: process.env.API_URL || 'http://localhost:8000/graphql',
  NODE_ENV: process.env.NODE_ENV || 'development',
})

export const getConfig = ({ distDir, entryPath, env, template }) => {
  const { plugins, rules } = getReactConfig({
    env,
    template,
  })
  return {
    entry: entryPath,
    mode: getMode(env),
    module: {
      rules,
    },
    output: {
      path: distDir,
      publicPath: '/',
      filename: 'main-[chunkhash].js',
    },
    plugins,
    target: 'web',
  }
}

export const setupReactWebpack = ({ defaultPort, env, ...webpackProps }) => {
  const getWebpackConfig = props =>
    getConfig({
      ...webpackProps,
      ...props,
      env: {
        ...getDefaultEnv(),
        ...env,
        ...props?.env,
      },
    })

  const createDevServer = props => {
    const compiler = webpack(getWebpackConfig(props))
    const devServerOptions = {
      open: true,
      port: process.env.PORT || defaultPort,
      historyApiFallback: true,
      hot: true,
    }
    return new WebpackDevServer(devServerOptions, compiler)
  }
  const runDevServer = () => createDevServer().start()
  const transpileScript = props => compile(webpack(getWebpackConfig(props)))
  const build = () =>
    transpileScript({
      env: { NODE_ENV: process.env.NODE_ENV || 'production' },
    })

  return { build, createDevServer, runDevServer, transpileScript }
}
