const form = document.getElementById('login-form');
const msg = document.getElementById('login-msg');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Mostrar mensaje de carga
    msg.textContent = 'Verificando credenciales...';
    msg.style.display = 'block';
    
    fetch('http://localhost:3000/clientes')
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Error al obtener los datos');
            }
        })
        .then(data => {
            const found = data.find(cliente => cliente.correo === email && cliente.contrasena === password);
            if (found) {
                localStorage.setItem('user', JSON.stringify(found));
                msg.textContent = '¡Login exitoso!';
                msg.style.color = 'green';
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 1000);
            } else {
                msg.textContent = 'Correo o contraseña incorrectos';
                msg.style.color = 'red';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            msg.textContent = 'Error al conectar con el servidor';
            msg.style.color = 'red';
        });
});
