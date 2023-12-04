
function abrirProductoCrear() {
    const modal = document.getElementById("modal-producto-create");
    modal.showModal();
}

// Define la función para agregar un producto
function agregarProducto(formulario) {
    // Alerta
    const alerta = document.getElementById("info-alerta");
    // Recupera la lista actual de productos del localStorage
    const productosGuardados = localStorage.getItem('productos');
    // Si no hay productos guardados, inicializa la lista como un array vacío
    const productos = productosGuardados ? JSON.parse(productosGuardados) : [];

    // Genera un nuevo ID acumulativo
    const nuevoId = productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;

    // Obtén las URLs de las imágenes
    const urls = [];

    // Verifica si se han seleccionado de 1 a 4 fotos
    if (formulario.fotos.files.length >= 1 && formulario.fotos.files.length <= 4) {
        // Muestra mensaje
        alerta.innerText = "Procesando..";
        alerta.style.color = "green";

        for (let i = 0; i < formulario.fotos.files.length; i++) {
            const url = URL.createObjectURL(formulario.fotos.files[i]);
            urls.push(url);
            // Si ya se recorrieron todas las url y son menos de 4
            if (i === (formulario.fotos.files.length - 1) && i < 3) {
                while (i <= 3) {
                    urls.push("./img/question-secondary.png"); // URL IMAGEN NO INGRESADA
                    i++;
                }
            }
        }

        // Obtiene los datos del formulario (aquí asumo que tu formulario tiene campos como 'titulo', 'precio', etc.)
        const nuevoProducto = {
            id: nuevoId,
            disponible: formulario.disponible.checked, // Puedes ajustar esto según tus necesidades
            titulo: formulario.titulo.value,
            precio: parseFloat(formulario.precio.value),
            fotos: urls,
            descripcion: formulario.descripcion.value
        };

        // Agrega el nuevo producto a la lista actual
        productos.push(nuevoProducto);
        // Actualiza la lista de productos en el localStorage
        localStorage.setItem('productos', JSON.stringify(productos));

    } else {
        // Muestra un mensaje de error
        alerta.innerText = "Error: Debes seleccionar hasta 4 fotos"
        alerta.style.color = "red";
    }
}

const formProductoCreate = document.getElementById('form-producto-create'); // Reemplaza 'tuFormulario' con el ID de tu formulario
formProductoCreate.addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario
    agregarProducto(formProductoCreate);
});

// boton cerrar modal

function cerrarModal(modal) {
    const modalElement = modal.closest('dialog');
    if (modalElement) {
        modalElement.close();
    }
}

/*

const formProductoUpdate = document.getElementById('form-producto-update'); // Reemplaza 'tuFormulario' con el ID de tu formulario
formulario.addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario
    agregarProducto(formulario);
});

const formContactoUpdate = document.getElementById('form-contacto-update'); // Reemplaza 'tuFormulario' con el ID de tu formulario
formulario.addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario
    agregarProducto(formulario);
});

*/

/*

// abrir y cerrar
document.getElementById('openAddProductModalBtn').addEventListener('click', function () {
    document.getElementById('addProductModal').style.display = 'flex';
});

document.getElementById('closeAddProductModalBtn').addEventListener('click', function () {
    document.getElementById('addProductModal').style.display = 'none';
});

// cerrar modal click afuera
window.addEventListener('click', function (event) {
    if (event.target === document.getElementById('addProductModal')) {
        document.getElementById('addProductModal').style.display = 'none';
    }
});

// envio de form añadiendo producto
document.getElementById('addProductForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Obtener valores del form
    const title = document.getElementById('productTitle').value;
    const description = document.getElementById('productDescription').value;
    const imageFile = document.getElementById('productImage').files[0];

    // Crear nueva tarjeta
    const newCard = document.createElement('div');
    newCard.className = 'card';
    newCard.style.width = '400px'; // mismo ancho que las predeterminadas??
    newCard.style.margin = '20px auto'; // mismo margen que las predeterminadas?

    const newTitle = document.createElement('h1');
    newTitle.className = 'card-title';
    newTitle.textContent = title;

    const newImage = document.createElement('img');
    newImage.className = 'card-image';

    // Imagen si está presente
    if (imageFile) {
        const imageURL = URL.createObjectURL(imageFile);
        newImage.src = imageURL;
        newImage.alt = 'Producto';
    } else {
        // en caso de no dar imagen ponemos una por default
        newImage.src = 'img/product_bata.jpg';
        newImage.alt = 'Producto';
    }

    const newDescription = document.createElement('p');
    newDescription.className = 'card-description';
    newDescription.textContent = description;

    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'card-buttons';

    const editButton = document.createElement('button');
    editButton.className = 'edit-button';
    editButton.textContent = 'Editar';

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'Eliminar';

    // Agregar elementos al nuevo elemento de tarjeta
    newCard.appendChild(newTitle);
    newCard.appendChild(newImage);
    newCard.appendChild(newDescription);
    newCard.appendChild(buttonsContainer);
    buttonsContainer.appendChild(editButton);
    buttonsContainer.appendChild(deleteButton);

    // Agregar nueva tarjeta al contenedor de tarjetas
    document.querySelector('.contenedor-cards').appendChild(newCard);

    // Cerrar el modal luego process info
    document.getElementById('addProductModal').style.display = 'none';

    // Resetear el formulario?  
    document.getElementById('addProductForm').reset();

});

*/

// ------------ Evento para cargar el carrito al cargar la página

window.onload = function () {
    actualizarContadorCarrito();
    comprobarSesion();
};