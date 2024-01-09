// ============================ BASE DE DATOS ============================

// La informacion de productos, administrador y contacto viene desde index.js !!!!!!

// --------------------------------------------------------------

// ============================ Catalogo de Productos ============================ 
//      ver esto
// Funcion para mostrar el catalogo de productos almacenados en la base de datos
function mostrarCatalogo() {

    // Recibe el elemento contenedor de tarjetas de productos
    const contenedor = document.querySelector(".contenedor-cards");
    // Limpia el contenedor
    contenedor.innerHTML = ``;
    // Recorre la lista de productos
    productos.forEach(producto => {
        let productoHTML = ``;
        productoHTML = `
            <div class="card">
                <h1 class="card-title">${producto.titulo}</h1>
                <img class="card-image" src="${producto.fotos[0]}" alt="Imagen del producto">
                <p class="card-description">${producto.descripcion}</p>
                <div class="card-buttons">
                    <button onclick="abrirProductoEditar(${producto.id});" class="edit-button"><i class="fa-solid fa-pen"></i>
                        Editar</button>
                    <button onclick="abrirProductoEliminar(${producto.id});" class="delete-button"><i class="fa-solid fa-trash"></i>
                        Eliminar</button>
                </div>
            </div>
            `;
        // Concatena el elemento dentro del contenedor
        contenedor.innerHTML += productoHTML;
    });


}

// =================================== MODAL CREAR PRODUCTO ===================================

// Función para mostrar el modal de crear producto
function abrirProductoCrear() {
    const modal = document.getElementById("modal-producto-create")
    modal.showModal();
}

// Función que recibe el formulario como argumento para crear un producto
function agregarProducto(formulario) {
    // Obtiene los datos del formulario
    const nuevoProducto = {
        disponible: formulario.disponible.checked,
        titulo: formulario.titulo.value,
        precio: parseFloat(formulario.precio.value),
        descripcion: formulario.descripcion.value,
    };

    // Obtiene las rutas de las imágenes desde los campos de entrada del formulario
    const foto1 = document.getElementById("foto-c1").files[0];
    const foto2 = document.getElementById("foto-c2").files[0];
    const foto3 = document.getElementById("foto-c3").files[0];
    const foto4 = document.getElementById("foto-c4").files[0];

    // Guarda las imágenes usando FormData junto con otros datos del producto
    const formData = new FormData();
    formData.append('disponible', nuevoProducto.disponible);
    formData.append('titulo', nuevoProducto.titulo);
    formData.append('precio', nuevoProducto.precio);
    formData.append('file', foto1);
    formData.append('file', foto2);
    formData.append('file', foto3);
    formData.append('file', foto4);
    formData.append('descripcion', nuevoProducto.descripcion);

    // Realiza una solicitud para subir las imágenes y obtener las rutas dinámicas
    fetch('http://localhost:3500/admin/products', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log('Respuesta del servidor:', data);
        // Puedes realizar más acciones después de agregar el producto
    })
    .catch(error => {
        console.error('Error al agregar el producto:', error);
        // Manejar el error si es necesario
    });
}

// Espera recibir el evento SUBMIT de CREAR PRODUCTO
const formProductoCreate = document.getElementById('form-producto-create');
formProductoCreate.addEventListener('submit', function (event) {
    // Evita el comportamiento predeterminado del formulario
    event.preventDefault();
    // Envia el formulario como argumento para crear un producto
    agregarProducto(formProductoCreate);
    // Recibe el elemento modal de CREAR PRODUCTO
    const modal = document.getElementById("modal-producto-create");
    // Cierra el modal
    cerrarModal(modal);
    // Limpia los input del formulario
    formProductoCreate.reset();
    // Refresca el catálogo de productos en el contenedor de tarjetas
    mostrarCatalogo();
});
// ver correccions
// =================================== MODAL EDITAR PRODUCTO ===================================
// Función para editar un producto
function editarProducto(formulario) {
    // Obtén el ID del producto a editar desde el formulario
    const productoId = formulario.productoId.value;

    // Busca el producto con el ID proporcionado desde el formulario
    const productoParaEditar = productos.find(producto => producto.id == productoId);

    // Si el producto no se encuentra, puedes manejar el caso de error o salir de la función
    if (!productoParaEditar) {
        console.error(`No se encontró el producto con ID ${productoId}`);
        return;
    }

    // Función auxiliar para obtener url de la foto por input
    function obtenerURL(fotoElement, index) {
        // Si el elemento existe y tiene al menos una foto cargada
        if (fotoElement && fotoElement.files.length > 0) {
            // Genera una url nueva para la foto
            return fotoElement.files[0].name; // MODIFICAR PARA BASE DE DATOS
        } else {
            // Si no hay foto cargada entonces retorna la url ya guardada en la base de datos
            return productoParaEditar.fotos[index];
        }
    }

    // Obtén las URLs de las imágenes con ayuda de la función auxiliar
    const urls = [];
    urls.push(obtenerURL(document.getElementById("foto-u1"), 0));
    urls.push(obtenerURL(document.getElementById("foto-u2"), 1));
    urls.push(obtenerURL(document.getElementById("foto-u3"), 2));
    urls.push(obtenerURL(document.getElementById("foto-u4"), 3));

    // Construye el objeto con los datos del producto a editar
    const productoActualizado = {
        id: productoParaEditar.id,
        disponible: formulario.disponible.checked,
        titulo: formulario.titulo.value,
        precio: formulario.precio.value,
        descripcion: formulario.descripcion.value,
        fotos: urls,
    };

    // Realiza la solicitud de actualización al servidor
    fetch(`http://localhost:3500/admin/products/${productoId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productoActualizado),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Producto actualizado con éxito:', data);
        // Puedes realizar más acciones después de actualizar el producto
        mostrarCatalogo();
    })
    .catch(error => {
        console.error('Error al actualizar el producto:', error);
        // Manejar el error si es necesario
    });
}

// Función para eliminar un producto
function eliminarProducto(idProductoAEliminar) {
    // Realiza la solicitud de eliminación al servidor
    fetch(`http://localhost:3500/admin/products/${idProductoAEliminar}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        console.log('Producto eliminado con éxito:', data);
        // Puedes realizar más acciones después de eliminar el producto
        mostrarCatalogo();
    })
    .catch(error => {
        console.error('Error al eliminar el producto:', error);
        // Manejar el error si es necesario
    });
}
//ver fin
// Funcion para mostrar el modal de editar producto por su ID Producto
function abrirProductoEditar(id) {
    const modal = document.getElementById("modal-producto-update");
    modal.showModal();
    // Recibe el elemento formulario de EDITAR PRODUCTO
    const formulario = document.getElementById('form-producto-update');
    // Carga el formulario con los datos correspondientes segun el ID de producto
    cargarDatosEditar(formulario, id);
}

// Funcion para cargar los datos del formulario de editar segun el ID Producto
function cargarDatosEditar(formulario, productoId) {

    // Busca el producto con el ID proporcionado
    const productoParaEditar = productos.find(producto => producto.id == productoId);

    // Llena el formulario pasado por parametro con los datos del producto
    formulario.productoId.value = productoParaEditar.id;
    formulario.disponible.checked = productoParaEditar.disponible;
    formulario.titulo.value = productoParaEditar.titulo;
    formulario.precio.value = productoParaEditar.precio;
    formulario.descripcion.value = productoParaEditar.descripcion;

    // Recibe los elementos de fotos vista previa y luego almacena la url correspondiente segun la foto
    const foto1 = document.getElementById("foto-min-1");
    foto1.src = productoParaEditar.fotos[0]; // url foto 1
    const foto2 = document.getElementById("foto-min-2");
    foto2.src = productoParaEditar.fotos[1]; // url foto 2
    const foto3 = document.getElementById("foto-min-3");
    foto3.src = productoParaEditar.fotos[2]; // url foto 3
    const foto4 = document.getElementById("foto-min-4");
    foto4.src = productoParaEditar.fotos[3]; // url foto 4

}

// Función para editar un producto
function editarProducto(formulario) {

    // Busca el producto con el ID producto proporcionado desde el formulario
    const productoParaEditar = productos.find(producto => producto.id == formulario.productoId.value);

    // Busca el índice en la lista de productos buscando por el ID producto proporcionado desde el formulario 
    const indexProductoParaEditar = productos.findIndex(producto => producto.id == formulario.productoId.value);

    // Si el indice del producto no se encuentra, puedes manejar el caso de error o salir de la función
    if (indexProductoParaEditar === -1) {
        console.error(`No se encontró el producto con ID ${formulario.productoId.value}`);
        console.log('Lista de productos:', productos);
        console.log('Producto a editar:', productoParaEditar);
        // Finaliza la funcion
        return;
    }

    // Funcion auxiliar para obtener url de la foto por input
    function obtenerURL(fotoElement, index) {
        // Si el elemento existe y tiene al menos una foto cargada
        if (fotoElement && fotoElement.files.length > 0) {
            // Genera una url nueva para la foto
            return fotoElement.files[0].name; // MODIFICAR PARA BASE DE DATOS
        } else {
            // Si no hay foto cargada entonces retorna la url ya guardada en la base de datos
            return productoParaEditar.fotos[index];
        }
    }

    // Obtén las URLs de las imágenes con ayuda de la funcion auxiliar
    const urls = [];
    urls.push(obtenerURL(document.getElementById("foto-u1"), 0));
    urls.push(obtenerURL(document.getElementById("foto-u2"), 1));
    urls.push(obtenerURL(document.getElementById("foto-u3"), 2));
    urls.push(obtenerURL(document.getElementById("foto-u4"), 3));

    // Reasigna los valores del producto a editar con los datos del formulario
    productoParaEditar.disponible = formulario.disponible.checked;
    productoParaEditar.titulo = formulario.titulo.value;
    productoParaEditar.precio = formulario.precio.value;
    productoParaEditar.descripcion = formulario.descripcion.value;
    productoParaEditar.fotos = urls;

    // Reemplaza el producto a editar en el indice indicado de la lista de productos
    productos[indexProductoParaEditar] = productoParaEditar;

    // >>>>>>>>>>>>>>>>>>>>>>>>>>> MODIFICAR PARA BASE DE DATOS <<<<<<<<<<<<<<<<<<<<<<<<<<<<
    // Actualiza la lista de productos en el localStorage
    // localStorage.setItem('productos', JSON.stringify(productos));  

    // Muestra un mensaje de éxito
    console.log(`Producto "${formulario.titulo.value}" (id=${formulario.productoId.value}) editado con éxito.`);
}

const formProductoUpdate = document.getElementById('form-producto-update');
formProductoUpdate.addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario
    editarProducto(formProductoUpdate);
    const modal = document.getElementById("modal-producto-update");
    cerrarModal(modal);
    formProductoUpdate.reset();
    mostrarCatalogo();
});

// =================================== MODAL ELIMINAR PRODUCTO ===================================

function abrirProductoEliminar(idProducto) {

    const modalDelete = document.createElement('dialog');
    modalDelete.id = 'modal-producto-delete';
    modalDelete.className = 'modal-delete';

    // Contenido del modal
    modalDelete.innerHTML = `
        <button class="cerrar-modal"><i class="fa-solid fa-xmark"></i></button>
        <div class="modal-content">
            <div class="content-info">
                <h2 class="modal-title">¿Desea eliminar?</h2>
                <p class="modal-sub">*Perderá toda la información del producto.</p>
            </div>
            <div class="d-flex gap-1 justify-content-center">
                <button class="btn-volver boton-form"><i class="fa-solid fa-arrow-left"></i> Cancelar</button>
                <button class="btn-eliminar boton-form"><i class="fa-regular fa-trash-can"></i> Eliminar</button>
            </div>
        </div>`;

    // "Volver"
    modalDelete.querySelector('.btn-volver').addEventListener('click', function () {
        cerrarModal(modalDelete);
    });

    // "Eliminar"
    modalDelete.querySelector('.btn-eliminar').addEventListener('click', function () {
        eliminarProducto(idProducto);
        cerrarModal(modalDelete);
    });

    // "Cerrar"
    modalDelete.querySelector('.cerrar-modal').addEventListener('click', function () {
        cerrarModal(modalDelete);
    });

    // Mostrar el modal
    document.body.appendChild(modalDelete);
    modalDelete.showModal();
}

function eliminarProducto(idProductoAEliminar) {

    // Filtra la lista para excluir el producto con el ID específico
    const nuevaListaProductos = productos.filter(producto => producto.id != idProductoAEliminar);

    // Actualiza la lista de productos en el localStorage con la nueva lista filtrada
    // localStorage.setItem('productos', JSON.stringify(nuevaListaProductos));  MODIFICAR PARA BASE DE DATOS

    mostrarCatalogo();
}

// =================================== MODAL EDITAR INFORMACION DE CONTACTO ===================================

// Llena el contacto con los datos del formulario
document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('form-contacto-update');
    cargarDatosContacto(formulario);
});

function abrirContactoEditar() {

    const modal = document.getElementById("modal-contacto-update");
    modal.showModal();
}
document.getElementById('form-contacto-update').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe normalmente

    const form = event.target;
    const formData = new FormData(form);

     // Convertir FormData a objeto
     const data = {};
     formData.forEach((value, key) => {
       data[key] = value;
     });
 
     // Ajustar el formato del objeto JSON 
     const formattedData = {
       telefono: data.telefono,
       hrInicio: data.hrInicio,
       hfFin: data.hrFin,
       direccion: data.ubicacion, // Cambié el nombre para que coincida con el campo en la base de datos
     };
    // Realizar la petición fetch
    fetch('http://localhost:3500/admin/contact/1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData),
     
    })
      .then(response => response.json())
      .then(result => {
        console.log('Éxito:', result);
        console.log('datos a enviar'+formattedData);
        cerrarModal();
      })
      .catch(error => {
        console.error('Error:', error);
        
      });
  });
/*
function cargarDatosContacto(formulario) {

    // Verificar si hay un contacto guardado
    if (contacto != null) {

        // Llena el formulario con los datos del contacto
        formulario.telefono.value = contacto.telefono || "";
        formulario.hrInicio.value = contacto.horaInicio || "";
        formulario.hrFin.value = contacto.horaFin || "";
        formulario.ubicacion.value = contacto.ubicacion || "";

    } else {
        console.error("No hay contacto guardado");
    }
}

function editarContacto(formulario) {

    // Verificar si hay un contacto guardado
    if (contactoGuardado) {

        contacto.telefono = formulario.telefono.value;
        contacto.hrInicio = formulario.hrInicio.value;
        contacto.hrFin = formulario.hrFin.value;
        contacto.ubicacion = formulario.ubicacion.value;

        // Actualiza contacto en localStorage
        //localStorage.setItem('contacto', JSON.stringify(contacto)); MODIFICAR PARA BASE DE DATOS

        // Muestra un mensaje de éxito
        console.log(`Contacto editado con éxito.`);
    } else {
        console.log(`No hay ningun contacto almacenado.`);
    }
}

const formContactoUpdate = document.getElementById('form-contacto-update');
formContactoUpdate.addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario
    editarContacto(formContactoUpdate);
    const modal = document.getElementById("modal-contacto-update");
    cerrarModal(modal);
});
*/
// =================================== BOTON cerrar modal ===================================

function cerrarModal(modal) {
    const modalElement = modal.closest('dialog');
    if (modalElement) {
        modalElement.close();
    }
}

// =================================== EVENTOS al CARGAR PAGINA =================================== 

window.onload = function () {
    // Se actualiza el contador del carrito ubicado en la esquina superior derecha
    actualizarContadorCarrito();
    // Comprueba si el usuario esta logueado como ADMIN y evalua si debe mostrar o no la barra de administracion
    comprobarSesion();
    // Refresca el catalogo de productos almacenados en la base de datos
    mostrarCatalogo();
};