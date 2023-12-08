// ============================ BASE DE DATOS ============================

// La informacion de productos, administrador y contacto viene desde index.js !!!!!!

// --------------------------------------------------------------

// =================================== EVENTOS al CARGAR PAGINA =================================== 

window.onload = function () {
    // Se actualiza el contador del carrito ubicado en la esquina superior derecha
    actualizarContadorCarrito();
    // Comprueba si el usuario esta logueado como ADMIN y evalua si debe mostrar o no la barra de administracion
    comprobarSesion();
};