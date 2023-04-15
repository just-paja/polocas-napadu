/* istanbul ignore file */
import { build } from './webpack.js'
import { squashBranchVars } from '@polocas-napadu/webpack'

squashBranchVars()
await build()
