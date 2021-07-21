function setupAccordion() {
  const accordions = Array.from(document.querySelectorAll('.accordion-item'))
  if (!accordions.length) return
  accordions.forEach(accordion => {
    accordion.addEventListener('click', function () {
      this.classList.toggle('is-open')
    })
  })
}

export { setupAccordion }