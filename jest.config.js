import { dirname, join } from 'path'
import { guessRootConfig } from 'lerna-jest'
import { fileURLToPath } from 'url'

const baseDir = dirname(fileURLToPath(import.meta.url))
const config = guessRootConfig(baseDir)

const jsdomProjects = [
  '@polocas-napadu/inspirations-integration',
  '@polocas-napadu/referee-integration',
  '@polocas-napadu/scoreboard-integration',
  '@polocas-napadu/scoreboard-integration',
  '@polocas-napadu/website-integration',
]

for (const project of config.projects) {
  project.testPathIgnorePatterns.push('/build/')
  project.transformIgnorePatterns = ['node_modules/(?!react-markdown|jebka)/']
  project.moduleFileExtensions = ['js', 'jsx', 'json', 'mjs', 'node', 'ts', 'tsx']
  project.moduleNameMapper = {
    ...project.moduleNameMapper,
    '^.+\\.md$': 'markdown-loader-jest',
    '.+\\.svg': 'jest-svg-transformer',
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      join(baseDir, '__jest__', 'fileMock.js'),
  }
  if (project.displayName.includes('integration')) {
    project.transform['^.+\\.(ts|tsx|mjsx)$'] = ['babel-jest', { rootMode: 'upward' }]
    project.testMatch = ['<rootDir>/**/__tests__/*.{cjs,js,jsx,mjs,ts,tsx}']
    console.log(project)
  }
  if (jsdomProjects.includes(project.displayName)) {
    project.testEnvironment = 'jsdom'
  }
}

config.transformIgnorePatterns = ['node_modules/(?!react-markdown|jebka)/']

export default config
