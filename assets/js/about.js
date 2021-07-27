import { setupSlider } from "./lib/slider";

setupSlider(".slider-wrapper", {
  autoplay: {
    delay: 5000,
  },
  slidesPerView: 1,
  spaceBetween: 10,
  breakpoints: {
    1024: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
});
