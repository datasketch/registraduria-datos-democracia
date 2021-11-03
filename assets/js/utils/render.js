export const renderItemLibrary = (item) => {
  const html = `
      <div class="library-item">
      ${checkPDF(item.url)}
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
        <a target="_blank" href="${data.path}" class="btn btn--tertiary">Descargar</a>
      </div>
    </div>
  `;
  return html;
};

function checkPDF(url) {
  let html = '';

  if (url === 'PDF') {
    html = `
    <img
    src="/images/biblioteca-recursos/imagen-biblioteca-recursos.png"
    alt="imagen biblioteca recurso"
    class="library-image"
    />
    `;
  } else {
    html = `
    <embed class="library-image" src="${url}"/>
    `;
  }

  return html;
}
