// ============================ BASE DE DATOS ============================

// Recupera el administrador del localStorage
// let storedAdministrador = localStorage.getItem('administrador'); // MODIFICAR BASE DE DATOS
// let administrador = JSON.parse(storedAdministrador); // MODIFICAR BASE DE DATOS

// Recupera el contacto del localStorage
// const contactoGuardado = localStorage.getItem('contacto');
// Si no hay contacto guardado, inicializa como nulo
// let contacto = contactoGuardado ? JSON.parse(contactoGuardado) : null;

// Recupera la lista actual de productos del localStorage
// const productosGuardados = localStorage.getItem('productos');
// Si no hay productos guardados, inicializa la lista como un array vacío
// const productos = productosGuardados ? JSON.parse(productosGuardados) : [];

// >>>>>>>>>>>>>>>>>>>>>>>>>>> MODIFICAR PARA BASE DE DATOS <<<<<<<<<<<<<<<<<<<<<<<<<<<<

let administrador = { // MODIFICAR BASE DE DATOS
    id: "444",
    usuario: "admin",
    clave: "admin",
    nombre: "Pau"
};

let contacto = { // MODIFICAR BASE DE DATOS
    id: "5678",
    telefono: "+54 9 3812 15-0565",
    horaInicio: '9:00',
    horaFin: '19:00',
    ubicacion: "Tucumán, San Miguel de Tucumán",
    id_admin: "444"
};

const productos = [ // MODIFICAR BASE DE DATOS
    { id: 0, disponible: true, titulo: 'Diseño de Invierno', precio: 32499, fotos: ['./img/products/product2_0.jpg', './img/products/product2_1.jpg', './img/products/product2_2.jpg', './img/products/product2_3.jpg'], descripcion: 'Prendas abrigadas con telas gruesas como lana, polar o algodón térmico. Los colores son más sobrios, con detalles suaves y texturas mullidas para proteger del frío. Los conjuntos suelen incluir elementos como gorros, bufandas y guantes a juego para un look cálido y acogedor.' },
    { id: 1, disponible: true, titulo: 'Diseño de Primavera', precio: 19999, fotos: ['./img/products/product3_0.jpg', './img/products/product3_1.jpg', './img/products/product3_2.jpg', './img/products/product3_3.jpg'], descripcion: 'Ropa alegre y colorida, con telas ligeras pero algo más abrigadas para días frescos. Predominan los estampados florales y los tonos pastel, con diseños que combinan comodidad y detalles delicados como bordados o encajes. Ideal para los cambios de temperatura típicos de la estación.' },
    { id: 2, disponible: true, titulo: 'Diseño de Verano', precio: 16999, fotos: ['./img/products/product0_0.jpg', './img/products/product0_1.jpg', './img/products/product0_2.jpg', './img/products/product0_3.jpg'], descripcion: 'Prendas ligeras y transpirables en telas frescas como algodón o lino, con diseños cómodos y colores vibrantes o pastel. Predominan los estampados alegres, como flores, frutas o patrones tropicales, y cortes que permiten libertad de movimiento.' },
    { id: 3, disponible: true, titulo: 'Diseño de Otoño', precio: 25499, fotos: ['./img/products/product1_0.jpg', './img/products/product1_1.jpg', './img/products/product1_2.jpg', './img/products/product1_3.jpg'], descripcion: 'Ropa en tonos cálidos y terrosos como mostaza, marrón y burdeos. Las prendas son más abrigadas, con tejidos suaves y cómodos como lana fina o algodón grueso, e incluyen detalles inspirados en hojas y naturaleza. Diseños prácticos para días frescos, con capas fáciles de combinar.' },
];

// ===================================== LOGIN =====================================

// Recibe el modal del login y sus botones
const modalLogin = document.querySelector("#modal-login");
const btnAbrirModalLogin = document.querySelector("#btn-modal-login");
const btnCerrarModalLogin = document.querySelector("#btn-cerrar-login");

// Espera el evento para abrir el modal
btnAbrirModalLogin.addEventListener("click", () => {
    modalLogin.showModal();
});

// Espera el evento para cerrar el modal
btnCerrarModalLogin.addEventListener("click", () => {
    modalLogin.close();
});

// Espera el evento para iniciar sesion
document.getElementById("form-login").addEventListener("submit", function (event) {

    // Evitar el envío del formulario
    event.preventDefault();

    // Recibe los valores de los input usuario y contrasenia
    var user = document.getElementById("usuario").value;
    var password = document.getElementById("clave").value;
    // Recibe el elemento de estado informativo
    var info = document.getElementById("info-login");

    // >>>>>>>>>>>>>>>>>>>>>>>>>>> MODIFICAR PARA BASE DE DATOS <<<<<<<<<<<<<<<<<<<<<<<<<<<<

    // Si los valores ingresados son iguales a los valores del administrador
    if (administrador.usuario == user && administrador.clave == password) {
        // Registra localmente que esta logueado
        localStorage.setItem("usuarioSession", "true");
        // Redirige al usuario a admin.html después de la autenticación
        window.location.href = "admin.html";
    } else {
        // Sino se emite un mensaje informativo    
        info.style.color = 'red';
        info.innerText = "Usuario o contraseña incorrectos.";
    }
});

// ============================ HEADER ADMINISTRACION ============================

// Funcion para saludar en la barra administrativa, ej: ("Mabel Hortensia Fernandez" => "Bienvenid@ Mabel")
function obtenerPrimerNombre(nombreCompleto) {
    // Dividir la cadena en palabras usando un espacio como separador
    const palabras = nombreCompleto.split(' ');
    // Devolver la primera palabra
    return palabras[0];
}

// Muestra u Oculta la barra administrativa
function comprobarSesion() {

    // Recibe los elementos a utilizar
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
        if (window.innerWidth <= 991) {
            // Si la ancho del dispositivo es menor o igual que 991px cambia el estilo de la barra administrativa
            headerAdmin.style.display = "block";
        } else {
            // Si la ancho del dispositivo es mayor que 991px cambia el estilo de la barra administrativa
            headerAdmin.style.display = "flex";
        }
        // Asigna el nombre del administrador
        userAdmin.innerText = "Bienvenid@ " + obtenerPrimerNombre(administrador.nombre);
        // Muestra el contenido del catalogo
        contenidoAdmin.style.display = "block";
    }
}

// Funcion para cerrar sesión
function cerrarSesion() {
    // Remover el estado de "logueado" del localStorage
    localStorage.removeItem("usuarioSession");
    window.location.href = "index.html";
    console.log("Sesión cerrada correctamente.");
}

// ============================ CARRITO DE COMPRAS ============================

// Si no hay ningún carrito almacenado, se inicializa como un array vacío 
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Funcion que actualiza el contador del carrito ubicado en la esquina superior derecha
function actualizarContadorCarrito() {

    // Recibe el elemento contador del carrito
    const contadorCarrito = document.querySelector(".carrito-contador");
    // Inicia variable en 0
    let cantidadItems = 0;
    // Recorre la lista de carrito y acumula la cantidad de cada item alojado
    carrito.forEach(item => {
        cantidadItems += item.cantidad;
    });

    // Si la cantidad de items en el carrito es mayor a 0
    if (cantidadItems > 0) {
        // Entonces muestra el contador
        contadorCarrito.style.display = 'block';
        if (cantidadItems < 10) {
            contadorCarrito.innerHTML = `${cantidadItems}`;
        } else {
            contadorCarrito.innerHTML = `+9`;
        }
    } else {
        // Sino oculta el contador
        contadorCarrito.style.display = 'none';
    }
}

// ============================ FOOTER ============================

// Recibe el elemento informacion del footer
const textoCreador = document.querySelector(".info-creador");
// Recibe el año actual
const añoActual = new Date().getFullYear();
// Muestra la informacion del equipo de desarrolladores
textoCreador.innerHTML = `&copy; ${añoActual} Italina, <a href="https://github.com/DanielHerrer" target="_blank" rel="noopener noreferrer">GitHub Developer</a>`;
