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

export const renderItemResult = (item) => {
  const html = `
      <div class="result-item">
      <h3 class="result-title">Alcaldía Cartagena 2011</h3>
      <p class="result-year">
        Elecciones locales Año 2011, Alcaldía de Bolívar
      </p>
      <p class="result-excel">
        Formato disponible: <span class="font-bold">XLSX</span>
      </p>
      <div class="result-btn">
        <a target="_blank" href="${item.path}" class="btn btn--tertiary">Descargar</a>
      </div>
    </div>
  `;
  return html;
};
