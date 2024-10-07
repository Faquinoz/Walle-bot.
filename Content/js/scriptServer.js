const body = document.querySelector("body"),
    navbar = body.querySelector(".navbar"),
    btn_resp = body.querySelector(".btn_resp"),
    contenidoDinamico = document.getElementById("contenido-dinamico");

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
        })
        .catch(error => {
            console.error('Error:', error);
            contenidoDinamico.innerHTML = '<p>No se pudo cargar el contenido.</p>';
        });
};

/*CONEXION ARCHIVOS*/
document.addEventListener("DOMContentLoaded", () => {
    cargarContenido('../../Page/Components/resources_Server/Information.html');

    const botones = {
        'btn-informacion': '../../Page/Components/resources_Server/Information.html',
        'btn-curso': '../../Page/Components/resources_Server/Shop-Course.html',
        'btn-usuarios': '../../Page/Components/resources_Server/User.html',
        'btn-pagos': '../../Page/Components/resources_Server/Payement.html',
        'btn-config': '../../Page/Components/resources_Server/AcercaDe.html',
        'btn-salir': () => alert("Cerrando sesión...")
    };

    Object.keys(botones).forEach(btn => {
        document.getElementById(btn)?.addEventListener("click", (event) => {
            event.preventDefault();
            const ruta = botones[btn];
            typeof ruta === 'string' ? cargarContenido(ruta) : ruta();
        });
    });
});

/*FRM DE REGISTRO INICIAL*/
document.addEventListener('DOMContentLoaded', () => {
    const userBtn = document.getElementById('user-btn');
    const profile = document.querySelector('.profile');

    userBtn.addEventListener('click', () => {
        profile.classList.toggle('active');
    });
});

/* ---------------------------- ACCIONES NORMALES ---------------------------- */
/*MOSTRAR FORMULARIOS DE REGISTRO*/
function mostrarFormulario() {
    const tipoSeleccionado = document.getElementById('tip').value;

    /*Course-Shop.html*/
    if (tipoSeleccionado === 'venta') {
        document.getElementById('frm-insert-shop').style.display = 'block';
        document.getElementById('frm-insert-course').style.display = 'none'; // Ocultar el formulario de curso si lo tienes
    } else if (tipoSeleccionado === 'curso') {
        document.getElementById('frm-insert-shop').style.display = 'none'; // Ocultar el formulario de venta
        document.getElementById('frm-insert-course').style.display = 'block'; // Mostrar el formulario de curso
    }

    /*Register-Server*/
    if (tipoSeleccionado === 'admin') {
        document.getElementById('frm-insert-admin').style.display = 'block';
        document.getElementById('frm-insert-subadmin').style.display = 'none';
        document.getElementById('frm-insert-docente').style.display = 'none';
    } else if (tipoSeleccionado === 'subadmin') {
        document.getElementById('frm-insert-admin').style.display = 'none';
        document.getElementById('frm-insert-subadmin').style.display = 'block';
        document.getElementById('frm-insert-docente').style.display = 'none';
    } else if (tipoSeleccionado === 'docente') {
        document.getElementById('frm-insert-admin').style.display = 'none';
        document.getElementById('frm-insert-subadmin').style.display = 'none';
        document.getElementById('frm-insert-docente').style.display = 'block';
    }
}

/*MOSTRAR EDICIÓN FORMULARIO DE REGISTRO*/
function editarPerfil() {
    document.querySelectorAll('input, textarea').forEach(function (campo) {
        campo.style.display = 'block';
        campo.disabled = false;
    });

    document.querySelectorAll('span').forEach(function (campo) {
        campo.style.display = 'none';
    });

    /*SAVE - EDIT*/
    document.querySelector('.btn-save').style.display = 'inline-block';
    document.querySelector('.btn-edit').style.display = 'none';
}

function guardarPerfil() {
    document.getElementById('nom-ape-display').textContent = document.getElementById('nom-ape').value;
    document.getElementById('doc-display').textContent = document.getElementById('doc').value;
    document.getElementById('mail-display').textContent = document.getElementById('mail').value;
    document.getElementById('estado-civil-display').textContent = document.getElementById('estado-civil').value;
    document.getElementById('ciudad-display').textContent = document.getElementById('ciudad').value;
    document.getElementById('biografia-display').textContent = document.getElementById('biografia').value;
    document.getElementById('frase-display').textContent = document.getElementById('frase').value;

    /*CAMPOS BLOQUEADOS Y DESBLOQUEADOS CON BTN*/
    document.querySelectorAll('input, textarea').forEach(function (campo) {
        campo.style.display = 'none';
        campo.disabled = true;
    });

    document.querySelectorAll('span').forEach(function (campo) {
        campo.style.display = 'block';
    });

    document.querySelector('.btn-edit').style.display = 'inline-block';
    document.querySelector('.btn-save').style.display = 'none';
}

/*IMG*/
function cambiarImagen() {
    const input = document.getElementById('file-input');
    const profilePic = document.getElementById('profile-pic');
    const defaultInitial = document.getElementById('default-initial');

    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            profilePic.src = e.target.result;
            profilePic.style.display = 'block';
            defaultInitial.style.display = 'none';
        };
        reader.readAsDataURL(input.files[0]);
    }
}