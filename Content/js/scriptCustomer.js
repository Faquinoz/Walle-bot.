const body = document.querySelector("body"),
    navbar = body.querySelector(".navbar"),
    btn_resp = body.querySelector(".btn_resp"),
    contenidoDinamico = document.getElementById("contenido-dinamico");




document.querySelectorAll('.session-btn').forEach((button, index) => {
    button.addEventListener('click', function () {
        const dropdown = document.getElementById(`dropdownVisual${index + 1}`);
        if (dropdown.style.display === 'none' || dropdown.style.display === '') {
            dropdown.style.display = 'block';
        } else {
            dropdown.style.display = 'none';
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