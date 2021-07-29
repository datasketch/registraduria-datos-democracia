"use strict";

const data = document.querySelector("#data-biblioteca");
const containerDate = document.querySelector(".date-container");
const containerLibrary = document.querySelector(".library-container");
let checkBoxDate;
let years = new Array();

data.remove();

const renderItemDate = (year) => {
  const html = `
    <label class="container-input"
      >${year}
      <input class="checkDate" type="checkbox" value="${year}" />
      <span class="checkmark"></span>
    </label>
  `;
  containerDate.insertAdjacentHTML("beforeend", html);
};

const renderItemLibrary = (item) => {
  const html = `
    <div class="library-item">
      <img
        src="/images/biblioteca-recursos/imagen-biblioteca-recursos.png"
        alt="imagen biblioteca recurso"
        class="library-image"
      />
      <div class="library-description">
        <span class="library-linea">${item.linea}</span>
        <h4 class="library-title">${item.titulo}</h4>
        <cite class="library-autor"
          >Autor: <span class="font-bold">${item.autor}</span></cite
        >
        <p class="library-paragraph">${item.descripcion}</p>
        <div class="library-date">
          <p class="library-year">
            Año de Investigación:
            <span> ${item.ano}</span>
          </p>
          <a
            href="${item.url}"
            target="_blank"
            download="XLSX"
            class="btn btn--tertiary"
            >Descargar</a
          >
        </div>
      </div>
    </div>
    `;
  containerLibrary.insertAdjacentHTML("beforeend", html);
};

const loadYears = () => {
  let res = JSON.parse(data.value);
  // GENERATE DINAMIC YEARS
  const years = new Set(
    ...[
      res
        .map((item) => item.ano)
        .filter((year) => +year)
        .sort((a, b) => b - a),
    ]
  );
  [...years].map((year) => renderItemDate(year));
  checkBoxDate = document.querySelectorAll(".checkDate");
  // console.log(checkBoxDate);
};

const loadItems = () => {
  containerLibrary.innerHTML = "";
  let res = JSON.parse(data.value);
  // SHOW PREVIUS ITEMS LIBRARIES
  res.slice(0, 3).map((item) => renderItemLibrary(item));
};

const itemsFilterYear = (...years) => {
  containerLibrary.innerHTML = "";
  let res = JSON.parse(data.value);

  // Filter items for year
  // const items = years.map((year) =>
  //   res.filter((item) => item.ano === year).sort((a, b) => a.ano - b.ano)
  // );
  // console.log(items);
  const items = res
    .filter((item) => years.includes(item.ano))
    .sort((a, b) => +b.ano - +a.ano);
  items.map((item) => renderItemLibrary(item));
};

const init = () => {
  loadItems();
  loadYears();
};
init();
console.log(checkBoxDate);

checkBoxDate.forEach((check) =>
  check.addEventListener("change", (e) => {
    if (e.target.checked) {
      years.push(e.target.value);
      itemsFilterYear(...years);
    } else {
      loadItems();
    }
  })
);

// itemsFilterYear("2016", "2019", "2013");
