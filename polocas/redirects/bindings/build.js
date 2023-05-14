/* istanbul ignore file */
import { build } from './webpack.js'
import { squashBranchVars } from '@polocas/webpack'

squashBranchVars()
await build()
