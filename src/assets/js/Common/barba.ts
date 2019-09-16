import Barba from 'barba.js'

Barba.Dispatcher.on(
  'newPageReady',
  (currentStatus, oldStatus, container, newPageRawHTML) => {
    if (Barba.HistoryManager.history.length === 1) {
      return
    }
    const head = document.head
    const newPageRawHead = newPageRawHTML.match(
      /<head[^>]*>([\s\S.]*)<\/head>/i
    )[0]
    const newPageHead = document.createElement('head')
    newPageHead.innerHTML = newPageRawHead
    const headTags = [
      "meta[name='keywords']",
      "meta[name='description']",
      "meta[property^='og']",
      "meta[name^='twitter']",
      'meta[itemprop]',
      'link[itemprop]',
      "link[rel='prev']",
      "link[rel='next']",
      "link[rel='canonical']",
      "link[rel='alternate']",
    ].join(',')
    const oldHeadTags = head.querySelectorAll(headTags)
    for (let i = 0; i < oldHeadTags.length; i += 1) {
      head.removeChild(oldHeadTags[i])
    }
    const newHeadTags = newPageHead.querySelectorAll(headTags)
    for (let i = 0; i < newHeadTags.length; i += 1) {
      head.appendChild(newHeadTags[i])
    }
  }
)
Barba.Pjax.start()
