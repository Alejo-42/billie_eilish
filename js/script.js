const $body = document.querySelector("body")
const $MD = document.querySelector("#MD")

const $abrir = document.querySelector(".abrir")
const $cerrar = document.querySelector(".cerrar")
const $albumes = document.querySelector(".btn-albumes")

function modoOscuro() {
    $body.classList.toggle("modoOscuro")
    $MD.textContent = $MD.textContent === "DARK MODE" ? "NORMAL MODE" : "DARK MODE"
}
function abrir() {
    $albumes.classList.add("visible")
    $abrir.classList.add("ocultarBoton")
}
function cerrar() {
    $albumes.classList.remove("visible")
    $abrir.classList.remove("ocultarBoton")
}

$MD.addEventListener("click",modoOscuro)

$abrir.addEventListener("click", abrir)
$cerrar.addEventListener("click",cerrar)