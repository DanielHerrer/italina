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