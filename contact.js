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
// =================================== INFORMACION DE CONTACTO ===================================
// Llena el formulario de contacto con los datos del servidor
document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('form-contacto-update');
    cargarDatosContacto(formulario);
});

// Función para cargar datos de contacto en el formulario
async function cargarDatosContacto(formulario) {
    try {
        // Realizar una solicitud al servidor para obtener los datos de contacto
        fetch('http://localhost:3500/datostienda/:1')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
        return response.json();
    })
    .then(contacto => {
        // Manejar la respuesta del servidor
        console.log(contacto);
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
    });


        // Obtener los datos de contacto del servidor
        const contacto = await response.json();
console.log('contacto llega asi', contacto );
        // Rellenar el formulario con los datos obtenidos
        formulario.querySelector('#telefono').value = contacto.telefono || '';
        formulario.querySelector('#hrInicio').value = contacto.horaInicio || '';
        formulario.querySelector('#hrFin').value = contacto.horaFin || '';
        formulario.querySelector('#ubicacion').value = contacto.ubicacion || '';

    } catch (error) {
        console.error('Error al cargar datos de contacto:', error);
    }
}
// Funcion para mostrar la informacion de contacto
function mostrarInformacion() {

    // Recibe los elementos que muestran la informacion
    const elementTelefono = document.getElementById("contact-telefono");
    const elementHoras = document.getElementById("contact-hrAtencion");
    const elementUbicacion = document.getElementById("contact-ubicacion");}
/*
    // Almacena en los elementos los valores de contacto
    elementTelefono.innerText = contacto.telefono;
    elementHoras.innerText = contacto.horaInicio + 'hs - ' + contacto.horaFin + 'hs';
    elementUbicacion.innerText = contacto.ubicacion;
}*/

// =================================== EVENTOS al CARGAR PAGINA =================================== 

window.onload = function () {
    // Se actualiza el contador del carrito ubicado en la esquina superior derecha
    actualizarContadorCarrito();
    // Refresca la informacion de contacto mostrada
    mostrarInformacion();
    // Comprueba si el usuario esta logueado como ADMIN y evalua si debe mostrar o no la barra de administracion
    comprobarSesion();
};