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
data.remove();

const state = {
  originalData: JSON.parse(data.value),
  filteredData: JSON.parse(data.value),
  filters: {
    ano: [],
    linea: [],
  },
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

function filterData(key, values) {
  containerLibrary.innerHTML = "";
  if (!key || !values.length) {
    state.filteredData = state.originalData;
    state.filteredData.forEach((item) => {
      const html = renderItemLibrary(item);
      containerLibrary.insertAdjacentHTML("beforeend", html);
    });
    return;
  }

  state.filteredData = state.filteredData
    .filter((item) => values.includes(item[key]))
    .sort((a, b) => a.ano - b.ano);

  state.filteredData.forEach((item) => {
    const html = renderItemLibrary(item);
    containerLibrary.insertAdjacentHTML("beforeend", html);
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
