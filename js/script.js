const $body = document.querySelector("body")
const $MD = document.querySelector("#MD")

const carousel = document.querySelector('.carousel');
const albumButton = document.querySelector('.album-button');
const carouselItems = carousel.querySelectorAll('.carousel-item');
// Suponiendo que cada diapositiva tiene un atributo data-album
carouselItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    const albumId = item.dataset.album;
    albumButton.textContent = `Ver álbum ${albumId}`;
  });
});function modoOscuro() {
    $body.classList.toggle("modoOscuro")
    $MD.textContent = $MD.textContent === "MODO OSCURO" ? "MODO NORMAL" : "MODO OSCURO"
}

$MD.addEventListener("click",modoOscuro)