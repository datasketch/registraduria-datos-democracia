const electoralesParent = document.querySelector('.container-electorales');
const electoralesBtnChilds = document.querySelectorAll('.btn-electorales');
const electoralesMessageBox = document.querySelectorAll('.box-electorales');

// EVENTS HANDLER
electoralesParent.addEventListener('click', (e) => {
  const button = e.target.closest('.btn-electorales');
  const id = button.getAttribute('data-id');

  // Reset button active
  electoralesBtnChilds.forEach((btn) => btn.classList.remove('btn-electorales--active'));

  // Reset message box
  electoralesMessageBox.forEach((msg) => msg.classList.remove('box-electorales--active'));

  // Add active button
  button.classList.add('btn-electorales--active');

  // Add active message box
  electoralesMessageBox[id].classList.add('box-electorales--active');
});
