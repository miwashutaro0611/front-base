/**
 * ブラウザ・OS判定用のtsファイル
 * Documents
 * https://www.npmjs.com/package/ua-parser-js
 */

import UAParser from 'ua-parser-js'

const parser = new UAParser()

const check = (parserParam, obj) => {
  console.dir(parserParam[obj])
  return parserParam[obj]
}

window.addEventListener(
  'load',
  () => {
    check(parser.getBrowser(), 'name') // ブラウザ判定 (name)
    check(parser.getDevice(), 'type') // デバイス判定 (type)
    check(parser.getOS(), 'name') // os判定 (name)
  },
  false
)

export default check
