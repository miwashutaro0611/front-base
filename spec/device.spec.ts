/**
 * @jest-environment jsdom
 */

/**
 * @see https://zenn.dev/sosukesuzuki/articles/560c751e62a515
 * jest v27でのjsdomについて
 */

import UAParser from 'ua-parser-js'
import device from '~/js/utils/device'

const parser = new UAParser()
const uastring =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36'
parser.setUA(uastring)

test('DeviceCheck - Browser', () => {
  expect(device(parser.getBrowser(), 'name')).toBe('Chrome')
})

test('DeviceCheck - Device', () => {
  expect(device(parser.getDevice(), 'type')).toBe(undefined)
})

test('DeviceCheck - OS', () => {
  expect(device(parser.getOS(), 'name')).toBe('Mac OS')
})
