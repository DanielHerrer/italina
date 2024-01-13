// ============================ BASE DE DATOS ============================

 let productosAdmin = []; // Variable para almacenar los productos

document.getElementById('obtenerDatosBtn').addEventListener('click', obtenerDatosDeLaBaseDeDatosAdmin);

async function obtenerDatosDeLaBaseDeDatosAdmin() {
    console.log('Iniciando obtención de datos...');
    try {
        // Obtener la respuesta del servidor para la parte de administrador
        const response = await fetch('http://localhost:3500/admin/products');

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        // Transformar los datos y asignar a productos
        const data = await response.json();
        console.log('Respuesta del servidor (Admin):', data);

        if (data.data) {
            productosAdmin = transformarDatos(data.data);
            console.log('Productos transformados:', productosAdmin);

            // Mostrar los productos en la página de administrador
            mostrarCatalogoAdmin();
        } else {
            console.error('La respuesta del servidor no contiene datos esperados:', data);
        }

        return productosAdmin;
    } catch (error) {
        console.error('Error en la solicitud (Admin):', error);
    }
}

// Función para transformar los datos del servidor al nuevo formato
function transformarDatos(datos) {
    return datos.map(producto => {
        return {
            id: producto.id,
            disponible: producto.disponible,
            titulo: producto.titulo,
            precio: producto.precio,
            fotos: [
                `http://localhost:3500/${producto.imagen1}`,
                `http://localhost:3500/${producto.imagen2}`,
                `http://localhost:3500/${producto.imagen3}`,
                `http://localhost:3500/${producto.imagen4}`
            ],
            descripcion: producto.descripcion,
        };
    });
}

// Función para mostrar productos en la página de administrador
function mostrarCatalogoAdmin() {
    // Obtener el contenedor donde mostrar los productos
    const contenedorAdmin = document.getElementById("admin-productos");

    // Limpiar el contenedor
    contenedorAdmin.innerHTML = '';

    // Recorrer la lista de productos y agregarlos al contenedor
    productosAdmin.forEach(producto => {
        let productoHTML = `
            <div id="producto-item">
                <div class="producto-caja-info">
                    <h2 class="titulo-item fw-normal lh-1">${producto.titulo}</h2>
                    <p class="texto-item lead">${producto.descripcion}</p>
                </div>
                <div class="producto-caja-vista">
                    <div class="producto-vista">
                        <div class="producto-vista-precio">$${producto.precio}</div>
                        <img src="${producto.fotos[0]}" alt="${producto.titulo}" class="marco-disponible 
                            producto-vista-imagen featurette-image img-fluid mx-auto" role="img"
                            preserveAspectRatio="xMidYMid slice" focusable="false" width="500" height="500"></img>
                        <div class="producto-botones">
                            <button onclick="eliminarProduct(${producto.id});" class="boton-producto boton-producto-ver">
                                Eliminar
                            </button>
                            <button onclick="abrirProductoEditar(${producto.id});" class="boton-producto boton-producto-ver">
                                Modificar
                            </button>
                        </div>
                        `;

        // Si el producto no está disponible
        if (producto.disponible == 0) {
            productoHTML += `
                        <div class="producto-lema">
                            <p class="texto-rojo">Producto no disponible</p>
                        </div>
                        `;
        }

        
        productoHTML += `
                    </div>
                </div>
            </div>
            <hr class="featurette-divider">
        `;

        // Concatenar el elemento dentro del contenedor
        contenedorAdmin.innerHTML += productoHTML;
    });
}


// Esperar a que la ventana (página) se cargue antes de llamar a obtenerDatosDeLaBaseDeDatosAdmin
window.onload = function () {
    obtenerDatosDeLaBaseDeDatosAdmin();
};

//
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


// Función para eliminar un producto por ID
async function eliminarProduct(id) {
    try {
        // Pregunta al usuario si realmente quiere eliminar el producto
        const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este producto?');

        if (!confirmacion) {
            
            return;
        }
        const response = await fetch(`http://localhost:3500/admin/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // Puedes agregar más encabezados según sea necesario
            },
            
            body: JSON.stringify({})
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud de eliminación: ${response.statusText}`);
        }

        
        console.log('Producto eliminado correctamente');
       

        // Actualizar la lista de productos después de la eliminación
        obtenerDatosDeLaBaseDeDatosAdmin();
    } catch (error) {
        console.error('Error al intentar eliminar el producto:', error);
    }
}



// Definir la variable id en un ámbito más amplio
let id;

// Funcion para mostrar el modal de editar producto por su ID Producto
function abrirProductoEditar(productoId) {
    const modal = document.getElementById("modal-producto-update");
    modal.showModal();
    // Recibe el elemento formulario de EDITAR PRODUCTO
    const formulario = document.getElementById('form-producto-update');
    // Carga el formulario con los datos correspondientes segun el ID de producto
    cargarDatosEditar(formulario, productoId);
}

async function cargarDatosEditar(formulario, productoId) {
    try {
        // Realizar una solicitud al servidor para obtener todos los productos
        const response = await fetch('http://localhost:3500/admin/products');
        
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const productos = (await response.json()).data;

        // Filtrar el producto deseado por su ID
        const producto = productos.find(producto => producto.id == productoId);

        if (!producto) {
            console.error(`Producto con ID ${productoId} no encontrado`);
            return;
        }
        formulario.querySelector('#disponibleSi').checked = producto.disponible === 1;
        formulario.querySelector('#disponibleNo').checked = producto.disponible === 0;
        formulario.querySelector('#precio').value = producto.precio;
        formulario.querySelector('#titulo').value = producto.titulo;
        formulario.querySelector('#descripcion').value = producto.descripcion;

        // Asignar el valor a la variable id en el ámbito más amplio
        id = productoId;

    } catch (error) {
        console.error('Error al cargar datos para editar:', error);
    }
}

document.getElementById('form-producto-update').addEventListener('submit', function (event) {
    event.preventDefault(); 
    
    const formData = new FormData(this);
    
    
    fetch(`http://localhost:3500/admin/products/${id}`, {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json',
            
        },
        body: JSON.stringify(Object.fromEntries(formData)),
    })
    .then(response => response.json())
    .then(data => {
        if (data && !data.error) {
            console.log('Producto actualizado correctamente');
            // Cierra el modal después de la actualización
            document.getElementById('modal-producto-update').close();
            // Actualiza la lista de productos después de la actualización, si es necesario
            obtenerDatosDeLaBaseDeDatosAdmin();
        } else {
            console.error('Error al actualizar el producto:', data.message || 'Error desconocido');
        }
    })
    .catch(error => {
        console.error('Error al intentar actualizar el producto:', error);
    });
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
       hfFinal: data.hrFin,
       direccion: data.ubicacion, 
     }
    fetch('http://localhost:3500/admin/contact/1', {
      method: 'PUT',
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