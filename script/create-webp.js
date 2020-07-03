/* eslint @typescript-eslint/no-var-requires: 0 */
// https://github.com/imagemin/imagemin/issues/191
const imagemin = require('imagemin')
const imageminWebp = require('imagemin-webp')
const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')

const OUTPUT_DIR = 'src/assets/img-webp/'

const INPUT_DIRS = ['src/assets/img/']

// https://stackoverflow.com/a/40896897/4364074

const isDirectory = (source) => lstatSync(source).isDirectory()
const getDirectories = (source) =>
  readdirSync(source)
    .map((name) => join(source, name))
    .filter(isDirectory)
const getDirectoriesRecursive = (source) => [
  source,
  ...getDirectories(source)
    .map(getDirectoriesRecursive)
    .reduce((a, b) => a.concat(b), []),
]

try {
  console.log('Beginning image compression...')
  ;(async () => {
    let imageDirs = []

    INPUT_DIRS.map((dirname) => (imageDirs = imageDirs.concat(getDirectoriesRecursive(dirname))))

    /**
     * Loop through all subfolders, and recursively run imagemin,
     * outputting to the same subfolders inside OUTPUT_DIR folder
     */
    for (let i in imageDirs) {
      const dir = imageDirs[i]
      const outputDir = dir.replace(/^src\/assets\/img\//g, './')
      await imagemin([`${dir}/*.{jpg,jpeg,png}`], {
        destination: join(OUTPUT_DIR, outputDir),
        plugins: [
          imageminWebp({
            quality: 65,
          }),
        ],
      })
      console.log(outputDir, `...${(((+i + 1) / imageDirs.length) * 100).toFixed(0)}%`)
    }

    console.log('Finished compressing all images!')
  })()
} catch (e) {
  console.log(e)
}
