"use strict";

const containerLibrary = document.querySelector(".library-container");
const data = document.querySelector("#data-biblioteca");
data.remove();

const renderItemLibrary = (item) => {
  const html = `
  <div
  class="
    grid grid-cols-12
    p-6
    bg-bg-informe bg-cover bg-center
    items-center
    lg:gap-x-8 lg:mb-10
  "
  >
    <img
      src="/images/biblioteca-recursos/imagen-biblioteca-recursos.png"
      alt="imagen biblioteca recurso"
      class="col-start-1 col-end-4"
    />
    <div class="col-start-4 col-end-13">
      <span class="italic text-primary-color text-sm mb-1">${item.linea}</span>
      <h4 class="text-primary-color lg:text-xl font-bold mb-1">${item.titulo}</h4>
      <cite class="block italic color-color-body text-sm mb-4"
        >Autor:
        <span class="font-bold">${item.autor}</span></cite
      >
      <p class="color-color-body lg:mb-9">${item.descripcion}</p>
      <div class="flex w-full justify-between">
        <p class="italic color-color-body text-sm mb-2">
          Año de Investigación: <span class="font-bold"> ${item.ano}</span>
        </p>
        <a href="${item.url}" target="_blank" download="XLSX" class="btn btn--tertiary">Descargar</a>
      </div>
    </div>
  </div>
    `;
  containerLibrary.insertAdjacentHTML("beforeend", html);
};

// INIT DEFAULT
((quantity) => {
  let res = JSON.parse(data.value);
  // SHOW PREVIUS ITEMS LIBRARIES
  console.log(res);
  res.slice(0, quantity).map((item) => renderItemLibrary(item));
})(3);

const itemsFilterYear = (year) => {};
