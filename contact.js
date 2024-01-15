// =================================== BASE DE DATOS ===================================

document.addEventListener('DOMContentLoaded', function () {
  const formulario = document.getElementById('formulario');

  formulario.addEventListener('submit', function (event) {
      event.preventDefault();

      const nombre = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const telefono = document.getElementById('number').value;
      const mensaje = document.getElementById('message').value;

      const datosAEnviar = {
        name: nombre,
        email: email,
        number: telefono,
        message: mensaje,
    };

      fetch('http://localhost:3500/contact/order', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(datosAEnviar)
      })
      .then(response => response.json())
      .then(data => {
          console.log(data);
          limpiarFormulario(); // Llama a la función después de enviar los datos
      })
      .catch(error => {
          console.error('Error:', error);
      });
  });

  // Agrega la función para limpiar el formulario
  function limpiarFormulario() {
      document.getElementById('name').value = '';
      document.getElementById('email').value = '';
      document.getElementById('number').value = '';
      document.getElementById('message').value = '';
  }
});

  
// -------------------------------------------------------------------------------------

// Recibe el atributo 'telefono' alojado en el Contacto de la base de datos
//const phone = contacto.telefono;

// =================================== FORMULARIO DE CONTACTO ===================================
/*
// Recibe los elementos a usar
const formulario = document.querySelector('#formulario');
const buttonSubmit = document.querySelector('#submit');
const urlDesktop = 'https://web.whatsapp.com/';
const urlMobile = 'whatsapp://';

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
/*
// Funcion para contactar por whatsapp a traves del formulario
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

// Espera el evento de SUBMIT del formulario de contacto
// Codigo aportado por el Lider Tecnico: Carlos Adrian Manzano
formulario.addEventListener('submit', (event) => {
    // Evita el comportamiento predeterminado del formulario
    event.preventDefault();
    // Deshabilita el boton de enviar hasta que el mensaje este listo para enviar
    buttonSubmit.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
    buttonSubmit.disabled = true;

    setTimeout(() => {
        // Recibe los valores ingresados en el formulario
        let nombre = document.querySelector('#name').value;
        let email = document.querySelector('#email').value;
        let number = document.querySelector('#number').value;
        let comment = document.querySelector('#message').value;

        // Prepara el numero de telefono
        let telefonoLimpio = limpiarNumeroTelefono(phone);

        // Prepara el mensaje que se va a enviar por whatsapp
        let mensaje = 'send?phone=' + telefonoLimpio + '&text=*Nombre*: %0A' + nombre + '%0A*Teléfono*: %0A' + number + (email === "" ? "" : '%0A*Correo Electrónico*: %0A' + email) + '%0A_Mensaje_: %0A' + comment + '';

        // Condicion Ternaria: Si es movil o escritorio se genera un url distinto
        window.open(isMobile() ? urlMobile + mensaje : urlDesktop + mensaje, '_blank');

        // Habilita nuevamente el boton de enviar
        buttonSubmit.innerHTML = '<i class="fab fa-whatsapp"></i> Enviar WhatsApp';
        buttonSubmit.disabled = false;
    }, 3000);
});
*/
// Modificacion de los datos de la tienda
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
            console.log('datos a enviar' + formattedData);
            cerrarModal();
        })
        .catch(error => {
            console.error('Error:', error);
        });
});


// Función para cargar datos de contacto en los elementos HTML
async function cargarDatosContacto() {
    try {
        // Realizar una solicitud al servidor para obtener los datos de contacto
        const response = await fetch('http://localhost:3500/datostienda/1');

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        // Obtener los datos de contacto del servidor
        const contacto = await response.json();

        
        // Rellenar los elementos HTML con los datos obtenidos
        document.getElementById('contact-telefono').innerText = contacto.data.telefono || '';
        document.getElementById('contact-hrAtencion').innerText = `${contacto.data.hrInicio.substring(0, 5) || ''} A ${contacto.data.hfFinal.substring(0, 5) || ''}`;
        document.getElementById('contact-ubicacion').innerText = contacto.data.direccion || '';

    } catch (error) {
        console.error('Error al cargar datos de contacto:', error);
    }
}

window.onload = function () {
    const formulario = document.getElementById('form-contacto-update');
    cargarDatosContacto(formulario);
};


// =================================== EVENTOS al CARGAR PAGINA =================================== 

window.onload = function () {
    // Se actualiza el contador del carrito ubicado en la esquina superior derecha
    actualizarContadorCarrito();
    // Refresca la informacion de contacto mostrada
    mostrarInformacion();
    // Comprueba si el usuario esta logueado como ADMIN y evalua si debe mostrar o no la barra de administracion
    comprobarSesion();
};