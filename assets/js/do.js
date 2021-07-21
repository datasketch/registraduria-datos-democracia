const triggers = Array.from(document.querySelectorAll('[data-modal]'))

const modals = new Map()
const dismissButtons = new Map()

triggers.forEach(trigger => {
  trigger.addEventListener('click', function () {
    const modalId = this.dataset.modal
    if (!modals.has(modalId)) {
      const modal = document.getElementById(modalId)
      modals.set(modalId, modal)
    }

    const modal = modals.get(modalId)
    
    function escKeyHandler(event) {
      if (event.keyCode !== 27) return
      window.removeEventListener('keyup', escKeyHandler)
      modal.classList.remove('is-open')
    }

    if (!dismissButtons.has(modalId)) {
      const dismissButton = modal.querySelector('button')
      dismissButton.addEventListener('click', () => {
        window.removeEventListener('keyup', escKeyHandler)
        modal.classList.remove('is-open')
      })
      dismissButtons.set(modalId, dismissButton)
    }

    const dismissButton = dismissButtons.get(modalId)

    modal.classList.add('is-open')
    dismissButton.focus()

    window.addEventListener('keyup', escKeyHandler)
  })
})