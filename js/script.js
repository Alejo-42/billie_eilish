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

let $abrirAlbumes = document.querySelector('#abrirAlbumes')
let $albums = document.querySelector('#albums')


function abrirAlbum() {
    if ($albums.style.display === 'none') {
        $albums.style.display = 'block'
        $abrirAlbumes.textContent = 'CLOSE'
    } else {
        $albums.style.display = 'none'
        $abrirAlbumes.textContent = 'OPEN'
    }
}
$abrirAlbumes.addEventListener('click',abrirAlbum)
