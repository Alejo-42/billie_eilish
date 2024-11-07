const $body = document.querySelector("#inicio")
const $MD = document.querySelector("#MD")


function modoOscuro() {
    $body.classList.toggle("modoOscuro")
    $MD.textContent = $MD.textContent === "MODO OSCURO" ? "MODO NORMAL" : "MODO OSCURO"
}


$MD.addEventListener("click",modoOscuro)