/**
 * webp 対応していれば target に is-webp、対応していなければ is-no-webp クラスを追加する
 */
import { supportsWebp } from '~/js/utils/supports-webp'

const addWebpDetectionClass = (): void => {
  const body = document.body
  if (supportsWebp()) {
    body.setAttribute('data-webpsupport', 'true')
  } else {
    body.setAttribute('data-webpsupport', 'false')
  }
}

window.addEventListener(
  'DOMContentLoaded',
  () => {
    addWebpDetectionClass()
  },
  false
)
