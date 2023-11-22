/* modal login */

const modal = document.querySelector("#modal-login");
const btnAbrirModalLogin = document.querySelector("#btn-modal-login");
const btnCerrarModalLogin = document.querySelector("#btn-cerrar-modal");

btnAbrirModalLogin.addEventListener("click", () => {
    modal.showModal();
});

btnCerrarModalLogin.addEventListener("click", () => {
    modal.close();
})

// ------------ Evento para cargar el carrito al cargar la página

window.onload = function () {
    actualizarContadorCarrito();
};