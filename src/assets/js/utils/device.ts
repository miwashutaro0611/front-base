/**
 * ブラウザ・OS判定用のtsファイル
 * Documents
 * https://www.npmjs.com/package/ua-parser-js
 */

import UAParser, { IBrowser, IDevice, IOS } from 'ua-parser-js'

type UAParserParam = IBrowser | IDevice | IOS
type UAType = 'type' | 'name'

const parser: UAParser = new UAParser()

const check = (parserParam: UAParserParam, obj: UAType): string => {
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
