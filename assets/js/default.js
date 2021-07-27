const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");
const btnDropDown = document.querySelectorAll(".dropdown");
const btnDropDownMenu = document.querySelectorAll(".dropdown-menu");

menuToggle.addEventListener("click", function () {
  menu.classList.toggle("hidden");
});

btnDropDown.forEach((btn, index) =>
  btn.addEventListener("click", function () {
    btnDropDownMenu[index].classList.toggle("hidden");
  })
);
