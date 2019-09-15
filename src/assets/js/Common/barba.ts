import barba from '@barba/core'

const mask = document.querySelector('.mask')
barba.init({
  transitions: [
    {
      async leave() {
        mask.classList.add('is-close')
        await new Promise(resolve => {
          return setTimeout(resolve, 1000)
        })
      },
      afterEnter() {
        mask.classList.remove('is-close')
      },
    },
  ],
})
