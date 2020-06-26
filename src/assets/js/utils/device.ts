/**
 * ブラウザ・OS判定用のtsファイル
 * Documents
 * https://www.npmjs.com/package/ua-parser-js
 */

import UAParser from 'ua-parser-js'

const parser = new UAParser()
const uaBrowser = parser.getBrowser() // ブラウザ判定
const uaDevice = parser.getDevice() // デバイス判定
const uaOs = parser.getOS() // os判定

window.addEventListener(
  'load',
  () => {
    console.dir(uaBrowser)
    console.dir(uaDevice)
    console.dir(uaOs)
  },
  false
)
