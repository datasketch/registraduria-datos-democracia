const nav = document.querySelector('.nav');
const btnHamburguer = document.querySelector('.menu-icon');
const btnDropDown = document.querySelectorAll('.dropdown');
const btnDropDownMenu = document.querySelectorAll('.dropdown-menu');

btnHamburguer.addEventListener('click', () => {
  btnHamburguer.classList.toggle('menu-icon--active');
  nav.classList.toggle('nav--active');
});

btnDropDown.forEach((btn, index) => btn.addEventListener('click', () => {
  btnDropDownMenu[index].classList.toggle('hidden');
}));
