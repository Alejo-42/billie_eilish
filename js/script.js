const $abrir = document.querySelector("#BtnAbrir")
const $cerrar = document.querySelector(".BtnCerrar")
const $inicio = document.querySelector(".ul-visible")

function abrir() {
    $inicio.classList.add("visible")
    $abrir.classList.add("ocultar")
}
function cerrar() {
    $inicio.classList.remove("visible")
    $abrir.classList.remove("ocultar")
}


$abrir.addEventListener("click",abrir)
$cerrar.addEventListener("click",cerrar)

