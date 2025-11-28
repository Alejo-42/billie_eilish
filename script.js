const spanAño = document.querySelector('.actualYear').innerHTML = fechaActual = new Date().getFullYear()

const btnToggleList = document.getElementById('btn-toggle-list')
const menuList = document.getElementById('menu-list')

function openAndClose() {
    menuList.classList.toggle('open')
}
if (btnToggleList) {
    btnToggleList.addEventListener('click', openAndClose)
}