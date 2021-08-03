import {
  renderItemResult,
  renderItemDate,
  renderItemNivel,
  renderItemType,
  renderButtons,
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

const filterData = (key, values, baseData) => {
  containerResults.innerHTML = "";
  if (!key || !values.length) {
    state.filteredData =
      baseData || state.originalData.sort((a, b) => b.ano - a.ano);
    pagination(state.page, state.filteredData).forEach((item) => {
      const html = renderItemResult(item);
      containerResults.insertAdjacentHTML("beforeend", html);
    });
    paginacion.insertAdjacentHTML(
      "beforeend",
      renderButtons(
        paginacion,
        state.page,
        state.itemsPerPagination,
        state.filteredData
      )
    );
    return;
  }
  state.filteredData =
    baseData ||
    state.filteredData
      .filter((item) => values.includes(item[key]))
      .sort((a, b) => b.ano - a.ano);

  pagination(state.page, state.filteredData).forEach((item) => {
    const html = renderItemResult(item);
    containerResults.insertAdjacentHTML("beforeend", html);
  });
  paginacion.insertAdjacentHTML(
    "beforeend",
    renderButtons(
      paginacion,
      state.page,
      state.itemsPerPagination,
      state.filteredData
    )
  );
};

const init = () => {
  filterData();
  loadYears();
  loadNivels();
};
init();

filtersContainer.addEventListener("change", (event) => {
  const { name: key, value, checked } = event.target;

  if (!state.filters[key] && !checked) filterData();

  if (state.filters[key].includes(value) && !checked) {
    const idx = state.filters[key].findIndex((item) => item === value);
    state.filters[key].splice(idx, 1);
    filterData(key, state.filters[key]);
  } else {
    state.filters[key].push(value);
    filterData(key, state.filters[key]);
  }
});

paginacion.addEventListener("click", function (e) {
  const btn = e.target.closest(".pagination__button");

  if (!btn) return;

  state.page = +btn.dataset.goto;
  filterData(null, null, state.filteredData);
  scrollPagination.scrollIntoView({ behavior: "smooth" });
});
