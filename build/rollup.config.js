import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify-es'
import minimist from 'minimist'
import { terser } from 'rollup-plugin-terser'

const argv = minimist(process.argv.slice(2))

const config = {
  input: 'src/promiseo.js',
  output: {
    name: 'promiseo',
    exports: 'named'
  },
  plugins: [
    buble({
      objectAssign: 'Object.assign'
    })
  ]
}

// Only minify browser (iife) version
if (argv.format === 'iife') {
  config.plugins.push(terser())
}

export default config
