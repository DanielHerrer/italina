// --------------------------------------------------------------

// Traer datos de los productos
// ( descripcion (Max. 800 caracteres) / imagenes: (Max. 4 fotos) )
const productos = [
    { id: 1, disponible: true, titulo: 'Kit Set completo de baño', precio: 5500, imagenes: ['./img/products/product_set.jpg', './img/products/product_set02.jpg', './img/products/product_set03.jpg', './img/products/product_set04.jpg'], descripcion: 'El kit Set de Baño incluye una toalla suave de mano, pads quita maquillaje reutilizables, vincha para cabello y turbante absorbente.<br> Experimenta comodidad y funcionalidad en cada paso de tu rutina de cuidado personal. Un conjunto diseñado para mejorar tu experiencia despues de un baño. <ul class="texto-item fw-bold fs-5" style="list-style-type: circle;"><li>Turbante para cabello</li><li>Toalla de mano</li><li>Pads quita maquillaje</li><li>Vincha de pelo</li></ul>' },
    { id: 2, disponible: true, titulo: 'Bata de toalla para baño', precio: 10500, imagenes: ['./img/products/product_bata.jpg', './img/products/product_bata02.jpg', './img/products/product_bata03.jpg', './img/products/product_bata04.jpg'], descripcion: '<span style="text-decoration: underline;">Absorción superior</span>: La bata de baño está hecha de materiales altamente absorbentes que te ayudarán a secarte rápidamente después de bañarte. <br><span style="text-decoration: underline;">Comodidad en el diseño</span>: Su diseño espacioso y corte relajado brindan una sensación de comodidad y libertad de movimiento. <br> <span style="text-decoration: underline;">Durabilidad</span>: Utilizamos materiales de alta calidad para garantizar que nuestras batas sean duraderas y resistan el desgaste constante. Puedes confiar en la calidad y la resistencia de nuestras batas para que te acompañen durante mucho tiempo.' },
    { id: 3, disponible: false, titulo: 'Funda de toalla almohada ', precio: 2900, imagenes: ['./img/products/product_almohada.jpg', './img/products/product_almohada.jpg', './img/products/product_almohada.jpg', './img/products/product_almohada.jpg'], descripcion: '<span style="text-decoration: underline;">Compatibilidad rizado</span>: Recomendada especialmente para cabello rizado y ondulado, estas fundas son la respuesta al frizz no deseado. Ayudan a que tus rizos mantengan su forma y evitan el envejecimiento prematuro de tu cabello, preservando la integridad de tu peinado mientras se seca. <br><span style="text-decoration: underline;">Protección nocturna</span>: Nuestra funda de almohada está cuidadosamente diseñada para proteger tanto tu cabello como tu almohada mientras disfrutas de un sueño reparador con el cabello mojado.' },
];

// Función para mostrar productos en la página
function mostrarProductos() {
    const contenedorProductos = document.getElementById('main-productos');
    productos.forEach(producto => {
        let productoHTML = ``;
        if (producto.disponible) {
            productoHTML = `
                <div id="producto-item">
                    <div class="producto-caja-info">
                        <h2 class="titulo-item fw-normal lh-1">${producto.titulo}</h2>
                        <p class="texto-item lead">${producto.descripcion}</p>
                    </div>
                    <div class="producto-caja-vista">
                        <div class="producto-vista">
                            <img src="${producto.imagenes[0]}" alt="${producto.titulo}" class="marco-disponible 
                            producto-vista-imagen featurette-image img-fluid mx-auto" role="img"
                                preserveAspectRatio="xMidYMid slice" focusable="false" width="500" height="500"></img>
                            <div class="producto-botones">
                                <button onclick="modalDetalles(${producto.id});" class="boton-producto boton-producto-ver"><i
                                            class="fa-solid fa-circle-info"></i> Detalles</button>
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
                            <img src="${producto.imagenes[0]}" alt="${producto.titulo}" class="marco-no-disponible 
                            producto-vista-imagen featurette-image img-fluid mx-auto" role="img"
                                preserveAspectRatio="xMidYMid slice" focusable="false" width="500" height="500"></img>
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

// ------------ Modal Detalles Producto

function modalDetalles(id) {

    const producto = productos.find(p => p.id === id);

    const modalProducto = document.querySelector("#modal-producto");
    const modalContenido = document.querySelector(".modal-producto-content");

    modalProducto.showModal();

    modalContenido.innerHTML = `
        <div class="fotos-producto">
            <img class="foto-max" src="${producto.imagenes[0]}" alt="">
            <div class="barra-fotos">
                <img class="foto-min" src="${producto.imagenes[0]}" onclick="actualizarFoto('${producto.imagenes[0]}');" alt="">
                <img class="foto-min" src="${producto.imagenes[1]}" onclick="actualizarFoto('${producto.imagenes[1]}');" alt="">
                <img class="foto-min" src="${producto.imagenes[2]}" onclick="actualizarFoto('${producto.imagenes[2]}');" alt="">
                <img class="foto-min" src="${producto.imagenes[3]}" onclick="actualizarFoto('${producto.imagenes[3]}');" alt="">
            </div>
        </div>
        <div class="descripcion-producto">
            <h2 class="titulo-producto">${producto.titulo}</h2>
            <p>${producto.descripcion}</p>
        </div>
    `;

}

function actualizarFoto(url) {
    const fotoMax = document.querySelector(".foto-max");
    fotoMax.src = url;
}

function cerrarDetalles() {

    const modalProducto = document.querySelector("#modal-producto");
    modalProducto.close();

}

// btnAbrirModal.addEventListener("click", () => {
//     modal.showModal();
// });

// btnCerrarModal.addEventListener("click", () => {
//     modalProducto.close();
// })


// ------------ Evento para cargar el carrito al cargar la página

window.onload = function () {
    cargarCarritoDesdeLocalStorage();
    actualizarContadorCarrito();
    mostrarProductos();
};