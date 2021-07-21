import SwiperCore, { Navigation, Pagination, Swiper, Autoplay } from 'swiper/core'

SwiperCore.use([Navigation, Pagination, Autoplay])

function setupSlider(el, opts = {}) {
  const wrapperEl = document.querySelector(el)

  if (!wrapperEl) return

  const swiperEl = wrapperEl.querySelector('.swiper-container')
  const paginationEl = wrapperEl.querySelector('.slider-pagination')
  const prevSlideEl = wrapperEl.querySelector('.slider-prev')
  const nextSlideEl = wrapperEl.querySelector('.slider-next')

  const config = {
    pagination: {
      el: paginationEl,
      clickable: true
    },
    navigation: {
      nextEl: nextSlideEl,
      prevEl: prevSlideEl
    },
    ...opts
  }

  const swiper = new Swiper(swiperEl, config)
  return swiper
}

export { setupSlider }