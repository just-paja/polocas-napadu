import { dirname } from 'path'
import { guessRootConfig } from '@optimics/jest'
import { fileURLToPath } from 'url'

const baseDir = dirname(fileURLToPath(import.meta.url))
const config = guessRootConfig(baseDir)

for (const project of config.projects) {
  project.transformIgnorePatterns = ['node_modules/(?!react-markdown|jebka)/']
}

config.transformIgnorePatterns = ['node_modules/(?!react-markdown|jebka)/']

export default config
