/* footer */

const textoCreador = document.querySelector(".info-creador");
const añoActual = new Date().getFullYear();

textoCreador.innerHTML = `&copy; ${añoActual} CONSTANA, MDP Programa`;

/* carrito */

// Variables globales
// Se utiliza para obtener el carrito almacenado previamente en localStorage. 
// Si no hay ningún carrito almacenado, se inicializa como un array vacío 
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

/* contador carrito */

function actualizarContadorCarrito() {

    const contadorCarrito = document.querySelector(".carrito-contador");

    let cantidadItems = 0;

    carrito.forEach(item => {
        cantidadItems += item.cantidad;
    });

    if (cantidadItems > 0) {
        contadorCarrito.style.display = 'block';
        contadorCarrito.innerHTML = `${cantidadItems}`;
    } else {
        contadorCarrito.style.display = 'none';
    }
}


