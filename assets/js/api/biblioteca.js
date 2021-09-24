import {
  renderItemLibrary,
  renderPaginationButtons,
} from '../utils/render';

const dataEl = document.querySelector('#data-biblioteca');
const containerLibrary = document.querySelector('.library-container');
const filtersContainer = document.getElementById('filters');
const paginationContainer = document.querySelector('.pagination');
const scrollPagination = document.querySelector('#paginationScroll');

dataEl.remove();

const state = {
  originalData: JSON.parse(dataEl.value)
    .filter(({ titulo }) => titulo).sort((a, b) => b.ano - a.ano),
  filteredData: null,
  filters: {
    ano: [],
    linea: [],
  },
  itemsPerPagination: 10,
  page: 1,
};

function paginate(page = state.page, data) {
  const start = (page - 1) * state.itemsPerPagination;
  const end = page * state.itemsPerPagination;
  return data.slice(start, end);
}

function filterData() {
  containerLibrary.innerHTML = '';
  const { filters, originalData } = state;
  const hasYearFilter = !!filters.ano.length;
  const hasLineFilter = !!filters.linea.length;
  state.filteredData = originalData;
  if (hasYearFilter) {
    state.filteredData = state.filteredData.filter((item) => filters.ano.includes(item.ano));
  }
  if (hasLineFilter) {
    state.filteredData = state.filteredData.filter((item) => filters.linea.includes(item.linea));
  }

  paginate(state.page, state.filteredData).forEach((item) => {
    const html = renderItemLibrary(item);
    containerLibrary.insertAdjacentHTML('beforeend', html);
  });

  paginationContainer.insertAdjacentHTML(
    'beforeend',
    renderPaginationButtons(
      paginationContainer,
      state.page,
      state.itemsPerPagination,
      state.filteredData,
    ),
  );
}

filtersContainer.addEventListener('change', (event) => {
  const { name: key, value } = event.target;
  const filterKeyValue = state.filters[key];

  if (filterKeyValue.includes(value)) {
    const idx = filterKeyValue.findIndex((item) => item === value);
    filterKeyValue.splice(idx, 1);
  } else {
    filterKeyValue.push(value);
  }

  state.page = 1;
  filterData();
});

paginationContainer.addEventListener('click', (e) => {
  const btn = e.target.closest('.pagination__button');

  if (!btn) return;

  state.page = +btn.dataset.page;
  filterData();
  scrollPagination.scrollIntoView({ behavior: 'smooth' });
});

window.addEventListener('load', () => {
  filterData();
});
