import barba from '@barba/core'
import barbaCss from '@barba/css'
import barbaPrefetch from '@barba/prefetch'

barba.use(barbaCss)
barba.use(barbaPrefetch)

barba.hooks.enter(() => {
  window.scrollTo(0, 0)
})

const replaceHeadTags = (target) => {
  const head = document.head
  const targetHead = target.html.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0]
  const newPageHead = document.createElement('head')
  newPageHead.innerHTML = targetHead
  const removeHeadTags = [
    "meta[name='keywords']",
    "meta[name='description']",
    "meta[property^='fb']",
    "meta[property^='og']",
    "meta[name^='twitter']",
    "meta[name='robots']",
    'meta[itemprop]',
    'link[itemprop]',
    "link[rel='prev']",
    "link[rel='next']",
    "link[rel='canonical']",
  ].join(',')
  const headTags = head.querySelectorAll(removeHeadTags)
  headTags.forEach((item) => {
    head.removeChild(item)
  })
  const newHeadTags = newPageHead.querySelectorAll(removeHeadTags)
  newHeadTags.forEach((item) => {
    head.appendChild(item)
  })
}

barba.hooks.beforeEnter(({ next }) => {
  console.log(next)
  replaceHeadTags(next)
})

barba.init()

const eventDelete = (e) => {
  if (e.currentTarget.href === window.location.href) {
    e.preventDefault()
    e.stopPropagation()
    return
  }
}

const links = document.querySelectorAll('a[href]')
links.forEach((link) => {
  link.addEventListener(
    'click',
    (e) => {
      eventDelete(e)
    },
    false
  )
})
