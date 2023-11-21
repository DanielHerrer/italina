// --------------------------------------------------------------

// Definir productos
const productos = [
    { id: 1, disponible: 'disponible', titulo: 'Kit Set completo de baño', precio: 5500, imagen: 'img/product_set.jpg', descripcion: 'El kit Set de Baño incluye una toalla suave de mano, pads quita maquillaje reutilizables, vincha para cabello y turbante absorbente.<br> Experimenta comodidad y funcionalidad en cada paso de tu rutina de cuidado personal. Un conjunto diseñado para mejorar tu experiencia despues de un baño. <ul class="texto-item fw-bold fs-5" style="list-style-type: circle;"><li>Turbante para cabello</li><li>Toalla de mano</li><li>Pads quita maquillaje</li><li>Vincha de pelo</li></ul>' },
    { id: 2, disponible: 'disponible', titulo: 'Bata de toalla para baño', precio: 10500, imagen: 'img/product_bata.jpg', descripcion: '<span style="text-decoration: underline;">Absorción superior</span>: La bata de baño está hecha de materiales altamente absorbentes que te ayudarán a secarte rápidamente después de bañarte. <br><span style="text-decoration: underline;">Comodidad en el diseño</span>: Su diseño espacioso y corte relajado brindan una sensación de comodidad y libertad de movimiento. <br> <span style="text-decoration: underline;">Durabilidad</span>: Utilizamos materiales de alta calidad para garantizar que nuestras batas sean duraderas y resistan el desgaste constante. Puedes confiar en la calidad y la resistencia de nuestras batas para que te acompañen durante mucho tiempo.' },
    { id: 3, disponible: 'no-disponible', titulo: 'Funda de toalla almohada ', precio: 2900, imagen: 'img/product_almohada.jpg', descripcion: '<span style="text-decoration: underline;">Compatibilidad rizado</span>: Recomendada especialmente para cabello rizado y ondulado, estas fundas son la respuesta al frizz no deseado. Ayudan a que tus rizos mantengan su forma y evitan el envejecimiento prematuro de tu cabello, preservando la integridad de tu peinado mientras se seca. <br><span style="text-decoration: underline;">Protección nocturna</span>: Nuestra funda de almohada está cuidadosamente diseñada para proteger tanto tu cabello como tu almohada mientras disfrutas de un sueño reparador con el cabello mojado.' },
];

// Función para mostrar productos en la página
function mostrarProductos() {
    const contenedorProductos = document.getElementById('main-productos');
    productos.forEach(producto => {
        let productoHTML = ``;
        if (producto.disponible === 'disponible') {
            productoHTML = `
                <div id="producto-item">
                    <div class="producto-caja-info">
                        <h2 class="titulo-item fw-normal lh-1">${producto.titulo}</h2>
                        <p class="texto-item lead">${producto.descripcion}</p>
                    </div>
                    <div class="producto-caja-vista">
                        <div class="producto-vista">
                            <img src="${producto.imagen}" alt="${producto.titulo}" class="marco-disponible 
                            featurette-image img-fluid mx-auto" width="500" height="500" role="img"
                                preserveAspectRatio="xMidYMid slice" focusable="false"></img>
                            <div class="producto-botones">
                                <a href="product-detail-1.html"><button class="boton-producto boton-producto-ver"><i
                                            class="fa-solid fa-circle-info"></i> Detalles</button></a>
                                <button onclick="agregarAlCarrito(${producto.id}); notificacionCarrito(this, ${producto.id}); actualizarContadorCarrito();" 
                                    class="boton-producto boton-producto-carrito">
                                        <i class="fa-solid fa-cart-plus"></i></button>
                            </div>
                        </div>
                    </div>
                </div>

                <hr class="featurette-divider">
            `;
        } else {
            productoHTML = `
                <div id="producto-item">
                    <div class="producto-caja-info">
                        <h2 class="titulo-item fw-normal lh-1 text-secondary">${producto.titulo}</h2>
                        <h3 class="subtitulo-item fw-normal lh-1 mb-3 text-secondary">(No disponible)</h3>
                        <p class="texto-item lead">${producto.descripcion}</p>
                    </div>
                    <div class="producto-caja-vista">
                        <div class="producto-vista">
                            <img src="${producto.imagen}" alt="${producto.titulo}" class="marco-no-disponible 
                            featurette-image img-fluid mx-auto" width="500" height="500" role="img"
                                preserveAspectRatio="xMidYMid slice" focusable="false"></img>
                            <div class="producto-botones">
                                <button class="boton-producto boton-producto-ver boton-no-disponible"><i
                                            class="fa-solid fa-circle-info"></i> Detalles</button>
                                <button 
                                    class="boton-producto boton-producto-carrito boton-no-disponible">
                                        <i class="fa-solid fa-cart-plus"></i></button>
                            </div>
                        </div>
                    </div>
                </div>

                <hr class="featurette-divider">
            `;
        }

        contenedorProductos.innerHTML += productoHTML;
    });
}

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
        guardarCarritoEnLocalStorage();
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

// // Función para abrir el modal del carrito
// function abrirModal() {
//     const modal = document.getElementById('modalCarrito');
//     modal.style.display = 'block';
//     mostrarCarrito();
// }

// // Función para cerrar el modal del carrito
// function cerrarModal() {
//     const modal = document.getElementById('modalCarrito');
//     modal.style.display = 'none';
// }

// // Evento para abrir el modal al hacer clic en el botón del carrito
// document.getElementById('btn-detalles').addEventListener('click', abrirModal);

// Notificacion añadido al carrito
function notificacionCarrito(boton, id) {

    const producto = productos.find(p => p.id === id);

    const carritoNotificacion = document.getElementById("carrito-notificacion");

    // Obtener todos los botones de carrito
    const botonesCarrito = document.querySelectorAll(".boton-producto-carrito");

    // Desactivar todos los botones de carrito temporalmente
    botonesCarrito.forEach(boton => {
        boton.disabled = true;
    });

    carritoNotificacion.classList.add("mostrar");

    carritoNotificacion.innerText = "Producto agregado: '" + producto.titulo + "'";

    // Después de un tiempo, ocultar la notificación
    setTimeout(function () {
        carritoNotificacion.classList.remove("mostrar");
        carritoNotificacion.innerHTML = "";

        // Reactivar todos los botones de carrito
        botonesCarrito.forEach(boton => {
            boton.disabled = false;
        });
    }, 2000); // 2000 milisegundos = 2 segundos
}

// ------------ Evento para cargar el carrito al cargar la página

window.onload = function () {
    cargarCarritoDesdeLocalStorage();
    actualizarContadorCarrito();
    mostrarProductos();
};