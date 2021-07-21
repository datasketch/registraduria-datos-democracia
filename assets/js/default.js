const menuToggle = document.getElementById('menu-toggle')
const menu = document.getElementById('menu')
const callButtons = [...document.querySelectorAll('.site-call')]

menuToggle.addEventListener('click', function() {
  menu.classList.toggle('hidden')
})

callButtons.forEach(button => {
  button.addEventListener('click', () => {
    Calendly.initPopupWidget({
      url: 'https://calendly.com/lasobremesa/30min'
    })
  })
})
