"use strict";
import {
  renderItemLibrary,
  renderItemDate,
  renderItemLine,
} from "../utils/render";

const data = document.querySelector("#data-biblioteca");
const containerLibrary = document.querySelector(".library-container");
const containerDate = document.querySelector(".date-container");
const containerLine = document.querySelector(".line-container");
const filtersContainer = document.getElementById("filters");
const paginacion = document.querySelector(".pagination");
const scrollPagination = document.querySelector("#paginationScroll");

data.remove();

const state = {
  originalData: JSON.parse(data.value),
  filteredData: JSON.parse(data.value),
  filters: {
    ano: [],
    linea: [],
  },
  itemsPerPagination: 4,
  page: 1,
};

const pagination = (page = state.page, data) => {
  const start = (page - 1) * state.itemsPerPagination; // 0;
  const end = page * state.itemsPerPagination; // 4;
  console.log(data.slice(start, end));
  return data.slice(start, end);
};

const renderButtons = (page) => {
  paginacion.innerHTML = "";
  const html = `
  <button class="pagination__button ${state.page === 1 ? "invisible" : "visible"} pagination__button--left bg-primary-color text-white py-2 px-4 mr-4">&leftarrow; Página <span>${
    page === 1 ? "1" : page
  }</span><button>
  <button class="pagination__button pagination__button--right bg-primary-color text-white py-2 px-4">Página <span>${
    page + 1
  }</span> &rightarrow;<button>
  `;
  paginacion.insertAdjacentHTML("beforeend", html);
};

const loadYears = () => {
  // GENERATE DINAMIC YEARS
  const years = new Set(
    ...[
      state.originalData
        .map((item) => item.ano)
        .filter((year) => +year)
        .sort((a, b) => b - a),
    ]
  );
  [...years].forEach((year) => {
    const html = renderItemDate(year);
    containerDate.insertAdjacentHTML("beforeend", html);
  });
};

const loadLines = () => {
  const lines = new Set(...[state.originalData.map((item) => item.linea)]);
  [...lines].map((line) => {
    const html = renderItemLine(line);
    containerLine.insertAdjacentHTML("beforeend", html);
  });
};

function filterData(key, values, baseData) {
  containerLibrary.innerHTML = "";
  if (!key || !values.length) {
    state.filteredData = baseData || state.originalData;
    pagination(state.page, state.filteredData).forEach((item) => {
      const html = renderItemLibrary(item);
      containerLibrary.insertAdjacentHTML("beforeend", html);
    });
    renderButtons(state.page);
    return;
  }
  paginacion.innerHTML = "";
  state.page = 1;
  state.filteredData = state.originalData
    .filter((item) => values.includes(item[key]))
    .sort((a, b) => a.ano - b.ano);



  pagination(state.page, state.filteredData).forEach((item) => {
    const html = renderItemLibrary(item);
    containerLibrary.insertAdjacentHTML("beforeend", html);
    renderButtons(state.page);
  });
}

const init = () => {
  filterData();
  loadYears();
  loadLines();
};
init();

filtersContainer.addEventListener("change", (event) => {
  const { name: key, value } = event.target;
  if (!state.filters[key]) return;

  if (state.filters[key].includes(value)) {
    const idx = state.filters[key].findIndex((item) => item === value);
    state.filters[key].splice(idx, 1);
  } else {
    state.filters[key].push(value);
  }
  filterData(key, state.filters[key]);
});

paginacion.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    e.target.classList.contains("pagination__button--left") &&
    state.page > 1
  ) {
    state.page--;
    filterData(null, null, state.filteredData);
    scrollPagination.scrollIntoView({ behavior: "smooth" });
  }

  if (
    e.target.classList.contains("pagination__button--right") &&
    state.page >= 1
  ) {
    state.page++;
    filterData(null, null, state.filteredData);
    scrollPagination.scrollIntoView({ behavior: "smooth" });
  }
});
