const $body = document.querySelector("body")
const $MD = document.querySelector("#MD")

const $abrir = document.querySelector("#abrir")
const $cerrar = document.querySelector("#cerrar")
const $albumes = document.querySelector(".albumes-ocultos")

function modoOscuro() {
    $body.classList.toggle("modoOscuro")
    $MD.textContent = $MD.textContent === "DARK MODE" ? "NORMAL MODE" : "DARK MODE"
}
function abrir() {
    $albumes.classList.remove("ocultar")
    $abrir.classList.add("ocultar")
}
function cerrar() {
    $albumes.classList.add("ocultar")
    $abrir.classList.remove("ocultar")
}

$MD.addEventListener("click",modoOscuro)

$abrir.addEventListener("click", abrir)
$cerrar.addEventListener("click",cerrar)