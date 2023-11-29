/* datos de contacto */

const phone = '+54 9 223 590-1382';
const open = '11:00';
const close = '17:00';
const ubication = 'Buenos Aires, Mar del Plata, Gascón 2169';

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

function actualizarInformacion() {

    const telefono = document.querySelector("#numero-telefono");
    const horarios = document.querySelector("#horarios-atencion");
    const ubicacion = document.querySelector("#ubicacion");

    telefono.innerText = phone;
    horarios.innerText = open + 'hs - ' + close + 'hs';
    ubicacion.innerText = ubication;
}

/* formulario de contacto */

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


const formulario = document.querySelector('#formulario');
const buttonSubmit = document.querySelector('#submit');
const urlDesktop = 'https://web.whatsapp.com/';
const urlMobile = 'whatsapp://';

formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    buttonSubmit.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
    buttonSubmit.disabled = true;
    setTimeout(() => {
        let nombre = document.querySelector('#name').value;
        let email = document.querySelector('#email').value;
        let number = document.querySelector('#number').value;
        let comment = document.querySelector('#message').value;

        let telefonoLimpiado = limpiarNumeroTelefono(phone);

        let mensaje = 'send?phone=' + telefonoLimpiado + '&text=*Nombre*: %0A' + nombre + '%0A*Teléfono*: %0A' + number + (email === "" ? "" : '%0A*Correo Electrónico*: %0A' + email) + '%0A_Mensaje_: %0A' + comment + '';

        // condicion ternaria, si es movil o escritorio se genera un url distinto
        window.open(isMobile() ? urlMobile + mensaje : urlDesktop + mensaje, '_blank');

        buttonSubmit.innerHTML = '<i class="fab fa-whatsapp"></i> Enviar WhatsApp';
        buttonSubmit.disabled = false;
    }, 3000);
});

// ------------ Evento para cargar el carrito al cargar la página

window.onload = function () {
    actualizarContadorCarrito();
    actualizarInformacion();
};