export const renderItemLibrary = (item) => {
  const html = `
      <div class="library-item">
      ${checkPDF(item.url, 1)}
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
            ${checkPDF(item.url, 2)}
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
      <p class="result-description">${data.tipo} ${data.ano}</p>
      <p class="result-excel">
        Formato disponible: <span class="font-bold">${data.format.toUpperCase()}</span>
      </p>
      <div class="result-btn">
        <a target="_blank" href="${data.path}" class="btn btn--tertiary">Descargar</a>
      </div>
    </div>
  `;
  return html;
};

function checkPDF(url, opc) {
  let html = '';

  if (opc === 1) {
    if (url === 'PDF') {
      html = `
      <div class="library-not-image"></div>
      `;
    } else {
      html = `
      <embed class="library-image" src="${url}"/>
      `;
    }
  } else if (opc === 2) {
    if (url === 'PDF') {
      html = `
      <button class="btn btn--tertiary cursor-not-allowed">No Disponible</button>
      `;
    } else {
      html = `
      <a
        href="${url}"
        target="_blank"
        download="XLSX"
        class="btn btn--tertiary"
        >Descargar</a>
      `;
    }
  }

  return html;
}
