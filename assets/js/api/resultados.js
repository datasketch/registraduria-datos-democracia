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
data.remove();

const state = {
  originalData: JSON.parse(data.value),
  filteredData: JSON.parse(data.value),
  filters: {
    ano: [],
    nivel: [],
    tipo: [],
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
    state.filteredData.forEach((item) => {
      const html = renderItemResult(item);
      containerResults.insertAdjacentHTML("beforeend", html);
    });
    return;
  }
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
  console.log(key, value);
  console.log(state.filters);
  if (!state.filters[key]) return;

  if (state.filters[key].includes(value)) {
    const idx = state.filters[key].findIndex((item) => item === value);
    state.filters[key].splice(idx, 1);
  } else {
    state.filters[key].push(value);
  }
  filterData(key, state.filters[key]);
});
