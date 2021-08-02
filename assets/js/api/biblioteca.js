"use strict";
import {
  renderItemLibrary,
  renderItemDate,
  renderItemLine,
  renderButtons
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
  return data.slice(start, end);
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
    paginacion.insertAdjacentHTML("beforeend", renderButtons(paginacion, state.page, state.itemsPerPagination, state.filteredData));
    return;
  }
  state.filteredData = state.originalData
    .filter((item) => values.includes(item[key]))
    .sort((a, b) => a.ano - b.ano);

  pagination(state.page, state.filteredData).forEach((item) => {
    const html = renderItemLibrary(item);
    containerLibrary.insertAdjacentHTML("beforeend", html);
  });
  paginacion.insertAdjacentHTML("beforeend", renderButtons(paginacion, state.page, state.itemsPerPagination, state.filteredData));
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
  const btn = e.target.closest(".pagination__button");

  if(!btn) return;

  state.page = +btn.dataset.goto;
  filterData(null, null, state.filteredData);
  scrollPagination.scrollIntoView({ behavior: "smooth" });
});
