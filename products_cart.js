// Definir productos
const productos = [
    { id: 1, disponible: 'disponible', titulo: 'Kit Set completo de baño', imagen: 'img/product_set.jpg', descripcion: 'El kit Set de Baño incluye una toalla suave de mano, pads quita maquillaje reutilizables, vincha para cabello y turbante absorbente. Experimenta comodidad y funcionalidad en cada paso de tu rutina de cuidado personal. Un conjunto diseñado para mejorar tu experiencia despues de un baño. <ul class="texto-item fw-bold fs-5" style="list-style-type: circle;"><li>Turbante para cabello</li><li>Toalla de mano</li><li>Pads quita maquillaje</li><li>Vincha de pelo</li></ul>' },
    { id: 2, disponible: 'disponible', titulo: 'Batas de toalla para baño', imagen: 'img/product_bata.jpg', descripcion: '<span style="text-decoration: underline;">Absorción superior</span>: La bata de baño está hecha de materiales altamente absorbentes que te ayudarán a secarte rápidamente después de bañarte. <br><span style="text-decoration: underline;">Comodidad en el diseño</span>: Su diseño espacioso y corte relajado brindan una sensación de comodidad y libertad de movimiento. <br> <span style="text-decoration: underline;">Durabilidad</span>: Utilizamos materiales de alta calidad para garantizar que nuestras batas sean duraderas y resistan el desgaste constante. Puedes confiar en la calidad y la resistencia de nuestras batas para que te acompañen durante mucho tiempo.' },
    { id: 3, disponible: 'no-disponible', titulo: 'Fundas de toalla almohada ', imagen: 'img/product_almohada.jpg', descripcion: '<span style="text-decoration: underline;">Compatibilidad rizado</span>: Recomendada especialmente para cabello rizado y ondulado, estas fundas son la respuesta al frizz no deseado. Ayudan a que tus rizos mantengan su forma y evitan el envejecimiento prematuro de tu cabello, preservando la integridad de tu peinado mientras se seca. <br><span style="text-decoration: underline;">Protección nocturna</span>: Nuestra funda de almohada está cuidadosamente diseñada para proteger tanto tu cabello como tu almohada mientras disfrutas de un sueño reparador con el cabello mojado.' },
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
        actualizarContadorCarrito()
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
        actualizarContadorCarrito()
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

// Función para mostrar el carrito en el modal
function mostrarCarrito() {
    const contenedorCarrito = document.getElementById('listaCarrito');
    contenedorCarrito.innerHTML = '';
    carrito.forEach(item => {
        const itemHTML = `
        <div class="item-carrito">
          <img src="${item.imagen}" alt="${item.titulo}">
          <p>${item.titulo} - Cantidad: ${item.cantidad}</p>
          <button onclick="agregarAlCarrito(${item.id})">+</button>
          <button onclick="reducirAlCarrito(${item.id})">-</button>

          <button onclick="quitarDelCarrito(${item.id})">Quitar</button>
        </div>
        
      `;
        contenedorCarrito.innerHTML += itemHTML;
    });
}

// Función para quitar productos del carrito
function quitarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    guardarCarritoEnLocalStorage();
    mostrarCarrito();
    actualizarContadorCarrito()
}

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    guardarCarritoEnLocalStorage();
    mostrarCarrito();
    actualizarContadorCarrito()
}

// ------------ Evento para cargar el carrito al cargar la página

window.onload = function () {
    cargarCarritoDesdeLocalStorage();
    actualizarContadorCarrito();
    mostrarCarrito();
};