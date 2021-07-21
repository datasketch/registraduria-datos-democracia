import { setupSlider } from './lib/slider'
import { setupAccordion } from './lib/accordion'

setupAccordion()
setupSlider('.slider-wrapper', {
  autoplay: {
    delay: 5000
  }
})