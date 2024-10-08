const body = document.querySelector("body"),
    navbar = body.querySelector(".navbar"),
    btn_resp = body.querySelector(".btn_resp"),
    contenidoDinamico = document.getElementById("contenido-dinamico");




document.querySelectorAll('.btnd').forEach((button, index) => {
    button.addEventListener('click', function () {
        // Obtener todos los botones y cajas
        const todosBotones = document.querySelectorAll('.btnd');
        const todasCajas = document.querySelectorAll('.caja');

        // Cerrar todas las cajas y resetear los estilos de los botones
        todasCajas.forEach((caja, cajaIndex) => {
            if (cajaIndex !== index) {
                caja.style.display = 'none';  // Cerrar cajas diferentes
                todosBotones[cajaIndex].style.backgroundColor = '';  // Resetear color de botones
            }
        });

        // Obtener la caja y el botón correspondiente al clicado
        const desplegable = document.querySelectorAll('.desplegable')[index];
        const caja = desplegable.querySelector('.caja');
        const botonActual = todosBotones[index];  // Botón actual

        // Alternar la caja actual (mostrar/ocultar) y cambiar color del botón
        if (caja.style.display === 'none' || caja.style.display === '') {
            caja.style.display = 'block';  // Mostrar la caja si está oculta
            botonActual.style.backgroundColor = '#88949f';  // Cambiar color del botón a gris
        } else {
            caja.style.display = 'none';  // Ocultar la caja si está visible
            botonActual.style.backgroundColor = '';  // Resetear color del botón
        }
    });
});



/* ---------------------------- NAVBAR ---------------------------- */
/*MENU LATERAL*/
btn_resp.addEventListener("click", () => {
    navbar.classList.toggle("close");
});

/*IFRAME*/
const cargarContenido = (ruta) => {
    fetch(ruta)
        .then(response => {
            if (!response.ok) throw new Error('Error al cargar el contenido.');
            return response.text();
        })
        .then(data => {
            contenidoDinamico.innerHTML = data;
            agregarEventosACheckboxes();
        })
        .catch(error => {
            console.error('Error:', error);
            contenidoDinamico.innerHTML = '<p>No se pudo cargar el contenido.</p>';
        });
};

/*CONEXION ARCHIVOS*/
document.addEventListener("DOMContentLoaded", () => {
    cargarContenido('../../Page/Components/resources_Customer/Home.html');

    const botones = {
        'btn-home': '../../Page/Components/resources_Customer/Home.html',
        'btn-shop': '../../Page/Components/resources_Customer/Shop.html',
        'btn-course': '../../Page/Components/resources_Customer/Course.html'
    };

    Object.keys(botones).forEach(btn => {
        document.getElementById(btn)?.addEventListener("click", (event) => {
            event.preventDefault();
            cargarContenido(botones[btn]);
        });
    });
});

/* ---------------------------- ACCIONES NORMALES ---------------------------- */
/*CARRITO COMPRAS*/
const agregarEventosACheckboxes = () => {
    const checkboxes = document.querySelectorAll('.product-checkbox');
    const totalPriceElement = document.getElementById('total-price');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const total = Array.from(checkboxes)
                .filter(cb => cb.checked)
                .reduce((sum, cb) => sum + parseFloat(cb.dataset.price), 0);
            totalPriceElement.textContent = total.toFixed(2);
        });
    });

    const checkoutButton = document.getElementById('poceder_pago');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            const paymentMethods = document.getElementById('payment-methods');
            if (paymentMethods) paymentMethods.style.display = 'block';
        });
    }
};