const $body = document.querySelector("body")
const $MD = document.querySelector("#MD")

const $abrir = document.querySelector("#abrir")
const $cerrar = document.querySelector("#cerrar")
const $albumes = document.querySelector(".albumes-ocultos")

const $abrirNav = document.querySelector("#abrirNav")
const $cerrarNav = document.querySelector("#cerrarNav")
const $nav = document.querySelector(".ul")

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
//      NAV       //
function abrirNav() {
    $nav.classList.remove("adios")
    $abrirNav.classList.add("adios")
}
function cerrarNav() {
    $nav.classList.add("adios")
    $abrirNav.classList.remove("adios")   
}

$MD.addEventListener("click",modoOscuro)

$abrir.addEventListener("click", abrir)
$cerrar.addEventListener("click",cerrar)

$abrirNav.addEventListener("click",abrirNav)
$cerrarNav.addEventListener("click",cerrarNav)