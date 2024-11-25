const $body = document.querySelector("body")
const $MD = document.querySelector("#MD")

function modoOscuro() {
    $body.classList.toggle("modoOscuro")
    $MD.textContent = $MD.textContent === "DARK MODE" ? "NORMAL MODE" : "DARK MODE"
}

$MD.addEventListener("click",modoOscuro)