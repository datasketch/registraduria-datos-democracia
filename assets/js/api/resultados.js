import {
  renderItemResult,
  renderItemDate,
  renderItemNivel,
  renderItemType,
} from "../utils/render";
const data = document.querySelector("#data-resultados");
const containerResults = document.querySelector(".results-container");
const containerDate = document.querySelector(".date-container");
const containerNivel = document.querySelector(".nivel-container");
const containerType = document.querySelector(".type-container");
const filtersContainer = document.getElementById("filters");
const paginacion = document.querySelector(".pagination");
const scrollPagination = document.querySelector("#paginationScroll");
data.remove();

const state = {
  originalData: JSON.parse(data.value),
  filteredData: JSON.parse(data.value),
  filters: {
    ano: [],
    nivel: [],
    tipo: [],
  },
  itemsPerPagination: 9,
  page: 1,
};

const pagination = (page = state.page, data) => {
  const start = (page - 1) * state.itemsPerPagination; // 0;
  const end = page * state.itemsPerPagination; // 4;
  return data.slice(start, end);
};

const renderButtons = (page) => {
  paginacion.innerHTML = "";
  const html = `
  <button class="pagination__button pagination__button--left bg-primary-color text-white py-2 px-4 mr-4">&leftarrow; Página <span>${
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

const loadNivels = () => {
  const nivels = new Set(
    ...[
      state.originalData
        .map((item) => item.nivel)
        .filter((level) => level !== undefined)
        .sort(),
    ]
  );
  [...nivels].forEach((nivel) => {
    const html = renderItemNivel(nivel);
    containerNivel.insertAdjacentHTML("beforeend", html);
  });
};

const loadTypes = () => {
  const types = new Set(
    ...[state.originalData.map((item) => item.tipo).sort()]
  );

  [...types].forEach((type) => {
    const html = renderItemType(type);
    containerType.insertAdjacentHTML("beforeend", html);
  });
};
loadTypes();

const filterData = (key, values) => {
  containerResults.innerHTML = "";
  if (!key || !values.length) {
    state.filteredData = state.originalData;
    pagination(state.page, state.filteredData).forEach((item) => {
      const html = renderItemResult(item);
      containerResults.insertAdjacentHTML("beforeend", html);
    });
    renderButtons(state.page)
    return;
  }
  paginacion.innerHTML = "";
  state.page = 1;
  state.filteredData = state.filteredData.filter((item) =>
    values.includes(item[key])
  );

  state.filteredData.forEach((item) => {
    const html = renderItemResult(item);
    containerResults.insertAdjacentHTML("beforeend", html);
  });
};

const init = () => {
  filterData();
  loadYears();
  loadNivels();
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
    filterData();
    scrollPagination.scrollIntoView({ behavior: "smooth" });
  }

  if (
    e.target.classList.contains("pagination__button--right") &&
    state.page >= 1
  ) {
    state.page++;
    filterData();
    scrollPagination.scrollIntoView({ behavior: "smooth" });
  }
});