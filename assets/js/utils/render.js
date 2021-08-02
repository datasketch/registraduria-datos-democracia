export const renderItemDate = (year) => {
  const html = `
      <label class="container-input"
        >${year}
        <input type="checkbox" name="ano" value="${year}" />
        <span class="checkmark"></span>
      </label>
    `;
  return html;
};

export const renderItemLine = (line) => {
  const html = `
      <label class="container-input"
        >${line}
        <input type="checkbox" name="linea" value="${line}" />
        <span class="checkmark"></span>
      </label>
    `;
  return html;
};

export const renderItemNivel = (nivel) => {
  const html = `
      <label class="container-input"
        >${nivel}
        <input type="checkbox" name="nivel" value="${nivel}" />
        <span class="checkmark"></span>
      </label>
    `;
  return html;
};

export const renderItemType = (tipo) => {
  const html = `
      <label class="container-input"
        >${tipo}
        <input type="checkbox" name="tipo" value="${tipo}" />
        <span class="checkmark"></span>
      </label>
    `;
  return html;
};

export const renderItemLibrary = (item) => {
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
  return html;
};

export const renderItemResult = (data) => {
  const html = `
      <div class="result-item">
      <h3 class="result-title">${data.titulo}</h3>
      <p class="result-description">${data.nivel} ${data.tipo} ${data.ano}</p>
      <p class="result-excel">
        Formato disponible: <span class="font-bold">${data.format.toUpperCase()}</span>
      </p>
      <div class="result-btn">
        <a target="_blank" href="${
          data.path
        }" class="btn btn--tertiary">Descargar</a>
      </div>
    </div>
  `;
  return html;
};

export const renderButtons = (parentEl, currentPage, perPagination, data) => {
  parentEl.innerHTML = "";
  const curPage = currentPage;
  const numPages = Math.ceil(data.length / perPagination);

  if (curPage === 1 && numPages > 1) {
    return `
    <button data-goto="${
      curPage + 1
    }" class="pagination__button bg-primary-color text-white py-2 px-4">Página <span>${
      curPage + 1
    }</span> &rightarrow;<button>
    `;
  }

  if (curPage === numPages && numPages > 1) {
    return `
    <button data-goto="${
      curPage - 1
    }" class="pagination__button bg-primary-color text-white py-2 px-4 mr-4">&leftarrow; Página <span>${
      curPage - 1
    }</span><button>
    `;
  }

  if (curPage < numPages) {
    return `
    <button data-goto="${
      curPage - 1
    }" class="pagination__button bg-primary-color text-white py-2 px-4 mr-4">&leftarrow; Página <span>${
      curPage - 1
    }</span><button>
    <button data-goto="${
      curPage + 1
    }" class="pagination__button bg-primary-color text-white py-2 px-4">Página <span>${
      curPage + 1
    }</span> &rightarrow;<button>
    `;
  }

  return "";
};
