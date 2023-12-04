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
        if (cantidadItems < 10) {
            contadorCarrito.innerHTML = `${cantidadItems}`;
        } else {
            contadorCarrito.innerHTML = `+9`;
        }
    } else {
        contadorCarrito.style.display = 'none';
    }
}

/* login */

let administrador = {
    id: "1234",
    usuario: "admin",
    clave: "admin",
    nombre: "Mabel Hortensia Medina"
}

let contacto = {
    id: "5678",
    telefono: "+54 9 223 590-1382",
    horaInicio: '11:00',
    horaFin: '17:00',
    ubicacion: "Buenos Aires, Mar del Plata, Gascón 2169",
    id_admin: "1234"
}

/* modal login */

const modalLogin = document.querySelector("#modal-login");
const btnAbrirModalLogin = document.querySelector("#btn-modal-login");
const btnCerrarModalLogin = document.querySelector("#btn-cerrar-login");

btnAbrirModalLogin.addEventListener("click", () => {
    modalLogin.showModal();
});

btnCerrarModalLogin.addEventListener("click", () => {
    modalLogin.close();
});

// Iniciar sesion
document.getElementById("form-login").addEventListener("submit", function (event) {

    // Evitar el envío del formulario
    event.preventDefault();

    var user = document.getElementById("usuario").value;
    var password = document.getElementById("clave").value;
    var info = document.getElementById("info-login");

    if (administrador.usuario == user && administrador.clave == password) {

        // Registra localmente que esta logueado
        localStorage.setItem("usuarioSession", "true");
        // Redirige al usuario a admin.html después de la autenticación
        window.location.href = "admin.html";

    } else {
        info.style.color = 'red';
        info.innerText = "Usuario o contraseña incorrectos.";
    }
});

// Muestra u Oculta la barra de administracion
function comprobarSesion() {

    const btnLogin = document.getElementById("btn-modal-login");
    const headerAdmin = document.getElementById("encabezado-admin");
    const userAdmin = document.getElementById("usuario-nombre");
    const contenidoAdmin = document.getElementById("contenido-admin");

    // Si esta logueado
    // Verificar si la clave "usuarioSession" existe en localStorage
    if (localStorage.getItem("usuarioSession") == "true") {
        // Se oculta el boton de login
        btnLogin.style.display = "none";
        // Muestra la barra de administracion
        // Si la ancho del dispositivo es igual o menor que 991px
        if (window.innerWidth <= 991) {
            headerAdmin.style.display = "block";
        } else {
            headerAdmin.style.display = "flex";
        }
        // Asigna el nombre del administrador
        userAdmin.innerText = "Bienvenid@ " + obtenerPrimerNombre(administrador.nombre);
        // Muestra el contenido del catalogo
        contenidoAdmin.style.display = "block";
    }
}

function cerrarSesion() {
    // Remover el estado de "logueado" del localStorage
    localStorage.removeItem("usuarioSession");
    window.location.href = "home.html";
    console.log("Sesión cerrada correctamente.");
}

function obtenerPrimerNombre(nombreCompleto) {
    // Dividir la cadena en palabras usando un espacio como separador
    const palabras = nombreCompleto.split(' ');
    // Devolver la primera palabra
    return palabras[0];
}