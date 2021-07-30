import { renderItemResult, renderItemDate } from "../utils/render";
const data = document.querySelector("#data-resultados");
const containerResults = document.querySelector(".results-container");
const containerDate = document.querySelector(".date-container");
const filtersContainer = document.getElementById("filters");
data.remove();

// const res = JSON.parse(data.value);
// console.log(res);

const state = {
  originalData: JSON.parse(data.value),
  filteredData: JSON.parse(data.value),
  filters: {
    ano: [],
  },
};

// const loadYears = () => {
//   // GENERATE DINAMIC YEARS
//   const years = new Set(
//     ...[
//       state.originalData
//         .map((item) => item.ano)
//         .filter((year) => +year)
//         .sort((a, b) => b - a),
//     ]
//   );
//   [...years].forEach((year) => {
//     const html = renderItemDate(year);
//     containerDate.insertAdjacentHTML("beforeend", html);
//   });
// };

const filterData = (key, values) => {
  containerResults.innerHTML = "";
  if (!key || !values.length) {
    state.filteredData = state.originalData;
    state.filteredData.slice(0, 9).forEach((item) => {
      const data = {
        titulo: `${item.nivel0} ${item.nivel1}`
          .toLowerCase()
          .split(" ")
          .map((item) => item[0].toUpperCase() + item.slice(1))
          .join(" "),
        ano: item.ano,
        url: item.path,
        // descripcion: item.nivel2.replace(".xls", ""),
      };
      const html = renderItemResult(data);
      containerResults.insertAdjacentHTML("beforeend", html);
    });
    return;
  }

  // state.filteredData = state.filteredData
  //   .filter((item) => values.includes(item))
  //   .sort((a, b) => a.ano - b.ano);

  state.filteredData.forEach((item) => {
    const html = renderItemResult(item);
    containerResults.insertAdjacentHTML("beforeend", html);
  });
};

const init = () => {
  filterData();
  // loadYears();
};
init();

filtersContainer.addEventListener("change", (event) => {
  const { name: key, value } = event.target;
  console.log(key, value);
  if (!state.filters[key]) return;

  if (state.filters[key].includes(value)) {
    const idx = state.filters[key].findIndex((item) => item === value);
    state.filters[key].splice(idx, 1);
  } else {
    state.filters[key].push(value);
  }
  filterData(key, state.filters[key]);
});
