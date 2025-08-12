// dashboard.js - Funcionalidad del dashboard

// Verificar si el usuario está autenticado al cargar la página
window.onload = function() {
    checkUserAuth();
    loadUserInfo();
};

// Verificar autenticación del usuario
function checkUserAuth() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = 'login.html';
    }
}

// Cargar información del usuario
function loadUserInfo() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        const userInfoElement = document.getElementById('user-info');
        if (userInfoElement) {
            userInfoElement.textContent = `Usuario: ${user.nombre || user.correo}`;
        }
    }
}

// Función de logout
function logout() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

// Configurar event listeners para los botones del dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Botón de logout
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    // Otros botones del dashboard (para futuras funcionalidades)
    const dashboardButtons = document.querySelectorAll('.dashboard-btn:not(.logout-btn)');
    dashboardButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Aquí puedes agregar la funcionalidad específica para cada botón
            console.log('Botón clickeado:', button.textContent);
        });
    });
});
