import barba from '@barba/core'
import barbaCss from '@barba/css'
import barbaPrefetch from '@barba/prefetch'

barba.use(barbaCss)
barba.use(barbaPrefetch)

barba.hooks.enter(() => {
  window.scrollTo(0, 0)
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
