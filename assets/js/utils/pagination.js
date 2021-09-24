export const paginate = (page = 1, itemsPerPagination, data) => {
  const start = (page - 1) * itemsPerPagination;
  const end = page * itemsPerPagination;
  return data.slice(start, end);
};

export const renderPaginationButtons = (parentEl, currentPage, perPagination, data) => {
  // eslint-disable-next-line no-param-reassign
  parentEl.innerHTML = '';
  const curPage = currentPage;
  const numPages = Math.ceil(data.length / perPagination);

  if (curPage === 1 && numPages > 1) {
    return `<button data-page="${curPage + 1}" class="pagination__button bg-primary-color text-white py-2 px-4">Página <span>${curPage + 1}</span> &rightarrow;<button>`;
  }

  if (curPage === numPages && numPages > 1) {
    return `<button data-page="${curPage - 1}" class="pagination__button bg-primary-color text-white py-2 px-4 mr-4">&leftarrow; Página <span>${curPage - 1}</span><button>`;
  }

  if (curPage < numPages) {
    return `<button data-page="${curPage - 1}" class="pagination__button bg-primary-color text-white py-2 px-4 mr-4">&leftarrow; Página <span>${curPage - 1}</span><button><button data-page="${curPage + 1}" class="pagination__button bg-primary-color text-white py-2 px-4">Página <span>${curPage + 1}</span> &rightarrow;<button>`;
  }

  return '';
};
