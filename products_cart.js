// --------------------------------------------------------------

// Traer datos de los productos
// ( descripcion (Max. 800 caracteres) / imagenes: (Max. 4 fotos) )
const productos = [
    { id: 1, disponible: true, titulo: 'Kit Set completo de baño', precio: 5500, imagenes: ['./img/products/product_set.jpg', './img/products/product_set02.jpg', './img/products/product_set03.jpg', './img/products/product_set04.jpg'], descripcion: 'El kit Set de Baño incluye una toalla suave de mano, pads quita maquillaje reutilizables, vincha para cabello y turbante absorbente.<br> Experimenta comodidad y funcionalidad en cada paso de tu rutina de cuidado personal. Un conjunto diseñado para mejorar tu experiencia despues de un baño. <ul class="texto-item fw-bold fs-5" style="list-style-type: circle;"><li>Turbante para cabello</li><li>Toalla de mano</li><li>Pads quita maquillaje</li><li>Vincha de pelo</li></ul>' },
    { id: 2, disponible: true, titulo: 'Bata de toalla para baño', precio: 10500, imagenes: ['./img/products/product_bata.jpg', './img/products/product_bata02.jpg', './img/products/product_bata03.jpg', './img/products/product_bata04.jpg'], descripcion: '<span style="text-decoration: underline;">Absorción superior</span>: La bata de baño está hecha de materiales altamente absorbentes que te ayudarán a secarte rápidamente después de bañarte. <br><span style="text-decoration: underline;">Comodidad en el diseño</span>: Su diseño espacioso y corte relajado brindan una sensación de comodidad y libertad de movimiento. <br> <span style="text-decoration: underline;">Durabilidad</span>: Utilizamos materiales de alta calidad para garantizar que nuestras batas sean duraderas y resistan el desgaste constante. Puedes confiar en la calidad y la resistencia de nuestras batas para que te acompañen durante mucho tiempo.' },
    { id: 3, disponible: false, titulo: 'Funda de toalla almohada ', precio: 2900, imagenes: ['./img/products/product_almohada.jpg', './img/products/product_almohada.jpg', './img/products/product_almohada.jpg', './img/products/product_almohada.jpg'], descripcion: '<span style="text-decoration: underline;">Compatibilidad rizado</span>: Recomendada especialmente para cabello rizado y ondulado, estas fundas son la respuesta al frizz no deseado. Ayudan a que tus rizos mantengan su forma y evitan el envejecimiento prematuro de tu cabello, preservando la integridad de tu peinado mientras se seca. <br><span style="text-decoration: underline;">Protección nocturna</span>: Nuestra funda de almohada está cuidadosamente diseñada para proteger tanto tu cabello como tu almohada mientras disfrutas de un sueño reparador con el cabello mojado.' },
];

// Función para agregar productos al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (producto) {
        const existente = carrito.find(item => item.id === id);
        if (existente) {
            existente.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }
        mostrarCarrito();
        guardarCarritoEnLocalStorage();
        actualizarContadorCarrito();
        actualizarPrecioTotal();
    }
}

// Función para reducir productos al carrito
function reducirAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (producto) {
        const existente = carrito.find(item => item.id === id);
        if (existente && existente.cantidad > 1) {
            existente.cantidad--;
        } else if (existente && existente.cantidad === 1) {
            quitarDelCarrito(id);
        }
        mostrarCarrito();
        guardarCarritoEnLocalStorage();
        actualizarContadorCarrito();
        actualizarPrecioTotal();
    }
}

// Función para guardar el carrito en el localStorage
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para cargar el carrito desde el localStorage
function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
}

// Función para mostrar el carrito en la lista
function mostrarCarrito() {
    const contenedorCarrito = document.getElementById('listaCarrito');
    contenedorCarrito.innerHTML = '';
    if (carrito.length > 0) {
        carrito.forEach(item => {
            const itemHTML = `
            <div class="item-carrito">
                <div class="item-carrito-foto">
                    <img class="item-img" src="${item.imagenes[0]}" alt="${item.titulo}">
                </div>
                <div class="item-carrito-producto">
                    <p class="item-titulo">${item.titulo}</p>
                </div>
                <div class="item-carrito-precio">
                    <p class="item-precio">$${item.precio} ARS</p>
                </div>
                <div class="item-carrito-cantidad">
                    <button class="btn-carrito btn-mas" onclick="agregarAlCarrito(${item.id})"><i class="fa-solid fa-plus"></i></button>
                    <p class="num-cantidad">Cantidad: ${item.cantidad}</p>
                    <button class="btn-carrito btn-menos" onclick="reducirAlCarrito(${item.id})"><i class="fa-solid fa-minus"></i></button>
                </div>
                <div class="item-carrito-subtotal">
                    <p class="item-subtotal">$${item.precio * item.cantidad} ARS</p>
                </div>
                <div class="item-carrito-borrar">
                    <button class="btn-carrito item-btn-remover" onclick="quitarDelCarrito(${item.id})"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </div>
            
          `;
            contenedorCarrito.innerHTML += itemHTML;
        });
    } else {
        const itemHTML = `
            <div class="item-carrito" style="color: #747474;">
                <div class="item-carrito-foto">
                    <img class="item-sin-img" src="./img/question-secondary.png" style="filter: brightness(1.1);" alt="Item producto">
                </div>
                <div class="item-carrito-producto">
                    <p class="item-titulo">Ingrese aquí su producto</p>
                </div>
                <div class="item-carrito-precio">
                    <p class="item-precio">ARS</p>
                </div>
                <div class="item-carrito-cantidad">
                    <button class="btn-carrito btn-mas" style="background-color: #ddd;"><i class="fa-solid fa-plus"></i></button>
                    <p class="num-cantidad">Cantidad: ?</p>
                    <button class="btn-carrito btn-menos" style="background-color: #ddd;"><i class="fa-solid fa-minus"></i></button>
                </div>
                <div class="item-carrito-subtotal">
                    <p class="item-subtotal">ARS</p>
                </div>
                <div class="item-carrito-borrar">
                    <button class="btn-carrito item-btn-remover" style="background-color: #ddd;"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </div>
            
          `;
        contenedorCarrito.innerHTML += itemHTML;
    }

}

// Función para quitar productos del carrito
function quitarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    guardarCarritoEnLocalStorage();
    mostrarCarrito();
    actualizarContadorCarrito();
    actualizarPrecioTotal();
}

function actualizarPrecioTotal() {
    var valor = 0;
    var precio = document.getElementById('precio');
    precio.innerText = '';

    if (carrito.length > 0) {
        carrito.forEach(item => {
            valor += item.precio * item.cantidad;
        });
        precio.innerText = '$ ' + valor + ' ARS*';
    } else {
        precio.innerText = '$ 0 ARS';
    }
}

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    guardarCarritoEnLocalStorage();
    mostrarCarrito();
    actualizarContadorCarrito();
    actualizarPrecioTotal();
}

// ------------ Evento para cargar el carrito al cargar la página

window.onload = function () {
    cargarCarritoDesdeLocalStorage();
    actualizarContadorCarrito();
    mostrarCarrito();
    actualizarPrecioTotal();
};