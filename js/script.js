const $body = document.querySelector("body")
const $MD = document.querySelector("#MD")

function modoOscuro() {
    $body.classList.toggle("modoOscuro")
    $MD.textContent = $MD.textContent === "MODO OSCURO" ? "MODO NORMAL" : "MODO OSCURO"
}

$MD.addEventListener("click",modoOscuro)