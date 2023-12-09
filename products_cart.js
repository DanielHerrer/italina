// ============================ BASE DE DATOS ============================

// La informacion de productos, administrador y contacto viene desde index.js !!!!!!

// --------------------------------------------------------------

// Recibe el atributo 'telefono' alojado en el Contacto de la base de datos
const phone = contacto.telefono;

// =================================== FUNCIONES CARRITO DE COMPRAS ===================================

// Función para agregar productos al carrito
function agregarAlCarrito(id) {
    // Busca el producto por ID
    const producto = productos.find(p => p.id === id);
    // Si el producto existe en la base de datos
    if (producto) {
        // Si el producto ya esta previamente añadido al carrito
        const existente = carrito.find(item => item.id === id);
        if (existente) {
            // Entonces le suma +1 a su cantidad
            existente.cantidad++;
        } else {
            // Sino entonces lo añade al carrito
            carrito.push({ ...producto, cantidad: 1 });
        }
        // Se refresca y muestra la lista del carrito de compras guardada en localStorage
        mostrarCarrito();
        // Guarda los datos del carrito en el localStorage
        guardarCarritoEnLocalStorage();
        // Se actualiza el contador del carrito ubicado en la esquina superior derecha
        actualizarContadorCarrito();
        // Refresca el precio total segun los items del carrito
        actualizarPrecioTotal();
    }
}

// Función para reducir productos al carrito
function reducirAlCarrito(id) {
    // Busca el producto por ID
    const producto = productos.find(p => p.id === id);
    // Si el producto existe en la base de datos
    if (producto) {
        // Si el producto ya esta previamente añadido al carrito
        const existente = carrito.find(item => item.id === id);
        // Si la cantidad de items del producto es mayor a 1
        if (existente && existente.cantidad > 1) {
            // Entonces le resta -1 a su cantidad
            existente.cantidad--;
        } else if (existente && existente.cantidad === 1) {
            // Sino entonces lo remueve del carrito
            quitarDelCarrito(id);
        }
        // Se refresca y muestra la lista del carrito de compras guardada en localStorage
        mostrarCarrito();
        // Guarda los datos del carrito en el localStorage
        guardarCarritoEnLocalStorage();
        // Se actualiza el contador del carrito ubicado en la esquina superior derecha
        actualizarContadorCarrito();
        // Refresca el precio total segun los items del carrito
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
    // Recibe el elemento contenedor del carrito de compras
    const contenedorCarrito = document.getElementById('listaCarrito');
    // Limpia el contenedor
    contenedorCarrito.innerHTML = '';
    // Si el carrito posee mas de items
    if (carrito.length > 0) {
        // Recorre el carrito y concatena cada item al contenedor
        carrito.forEach(item => {
            const itemHTML = `
            <div class="item-carrito">
                <div class="item-carrito-foto">
                    <img class="item-img" src="${item.fotos[0]}" alt="${item.titulo}">
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
        // Sino entonces muestra un item default vacio
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

// Función para quitar items del carrito
function quitarDelCarrito(id) {
    // Filtra la lista del carrito segun el ID de producto
    carrito = carrito.filter(item => item.id !== id);
    // Guarda los datos del carrito en el localStorage
    guardarCarritoEnLocalStorage();
    // Se refresca y muestra la lista del carrito de compras guardada en localStorage
    mostrarCarrito();
    // Se actualiza el contador del carrito ubicado en la esquina superior derecha
    actualizarContadorCarrito();
    // Refresca el precio total segun los items del carrito
    actualizarPrecioTotal();
}

// Funcion para actualizar el precio total segun los items alojados en la lista carrito
function actualizarPrecioTotal() {
    var valor = 0;
    var precio = document.getElementById('precio');
    precio.innerText = '';


    if (carrito.length > 0) {
        // Si hay al menos 1 item alojado en la lista carrito
        carrito.forEach(item => {
            // Acumula el valor total segun el item * cantidad
            valor += item.precio * item.cantidad;
        });
        precio.innerText = '$ ' + valor + ' ARS*';
    } else {
        // Sino hay items entonces $ 0
        precio.innerText = '$ 0 ARS';
    }
}

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    // Guarda los datos del carrito en el localStorage
    guardarCarritoEnLocalStorage();
    // Se refresca y muestra la lista del carrito de compras guardada en localStorage
    mostrarCarrito();
    // Se actualiza el contador del carrito ubicado en la esquina superior derecha
    actualizarContadorCarrito();
    // Refresca el precio total segun los items del carrito
    actualizarPrecioTotal();
}

// =================================== MODAL CONFIRMAR COMPRA ===================================

// Funcion para mostrar el modal confirmativo de la Orden de Compra
function modalConfirmarCompra() {
    // Recibe el elemento modal de confirmacion
    const modalConfirmar = document.querySelector("#modal-confirmar");
    const modalPrecio = document.querySelector(".modal-precio");
    const precio = document.querySelector("#precio");

    // Si el carrito posee al menos 1 item entonces muestra el modal
    if (carrito.length > 0) {
        modalConfirmar.showModal();
    }
    // Coloca el valor total de la lista de items 
    modalPrecio.innerText = `${precio.innerText}`;
}

// Funcion para cerrar el modal confirmativo de la Orden de Compra
function cerrarConfirmar() {

    const modalConfirmar = document.querySelector("#modal-confirmar");
    modalConfirmar.close();
}

// =================================== REALIZAR ORDEN DE COMPRA ===================================

// Limpia el numero, ej: (+54 9 223 590-1382) => (5492235901382)
function limpiarNumeroTelefono(telefono) {
    let numeroLimpiado = '';
    for (let i = 0; i < telefono.length; i++) {
        const caracter = telefono.charAt(i);

        if (!isNaN(caracter)) {
            numeroLimpiado += caracter;
        }
    }
    return numeroLimpiado;
}

// Codigo aportado por el Lider Tecnico: Carlos Adrian Manzano
function isMobile() {
    if (sessionStorage.desktop) {
        return false;
    } else if (localStorage.mobile) {
        return true;
    }
    var mobile = ['iphone', 'ipad', 'android', 'blackberry', 'nokia', 'opera mini', 'windows mobile', 'windows phone', 'iemobile'];

    for (var i in mobile) {
        console.log(navigator.userAgent);
        if (navigator.userAgent.toLowerCase().indexOf(mobile[i].toLowerCase()) > 0) {
            return true;
        }
    }
    return false;
}

// Codigo aportado por el Lider Tecnico: Carlos Adrian Manzano
function enviarOrden() {

    const urlDesktop = 'https://web.whatsapp.com/';
    const urlMobile = 'whatsapp://';

    const buttonComprar = document.querySelector('.btn-comprar');

    buttonComprar.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
    buttonComprar.disabled = true;

    setTimeout(() => {

        let telefonoLimpiado = limpiarNumeroTelefono(phone)

        let mensaje = 'send?phone=' + phone + '&text=Hola, quisiera realizar mi Orden de Compra:';

        for (item of carrito) {

            mensaje += `%0A- *${item.titulo}* Cantidad (${item.cantidad})`;
        }

        mensaje += `%0A_*Precio sujeto a modificaciones_ %0A Aguardo atentx su respuesta. :)`;


        // condicion ternaria, si es movil o escritorio se genera un url distinto
        window.open(isMobile() ? urlMobile + mensaje : urlDesktop + mensaje, '_blank');

        buttonComprar.innerHTML = '<i class="fa-brands fa-whatsapp m-1"></i> Realizar Orden'
        buttonComprar.disabled = false

        cerrarConfirmar();
        vaciarCarrito();

    }, 3000);
}

// =================================== EVENTOS al CARGAR PAGINA =================================== 

window.onload = function () {
    // Se actualiza la lista de carrito almacenada en localStorage
    cargarCarritoDesdeLocalStorage();
    // Se actualiza el contador del carrito ubicado en la esquina superior derecha
    actualizarContadorCarrito();
    // Se refresca y muestra la lista del carrito de compras guardada en localStorage
    mostrarCarrito();
    // Refresca el precio total segun los items del carrito
    actualizarPrecioTotal();
    // Comprueba si el usuario esta logueado como ADMIN y evalua si debe mostrar o no la barra de administracion
    comprobarSesion();
};