// Variables globales
let clientes = [];

// Elementos del DOM
const container = document.querySelector('.container');

// Inicializar la página
document.addEventListener('DOMContentLoaded', async () => {
    await cargarClientes();
});

// Cargar clientes
async function cargarClientes() {
    try {
        const response = await fetch('http://localhost:3000/clientes');
        if (response.ok) {
            clientes = await response.json();
            mostrarClientes();
        } else {
            console.error('Error al cargar clientes:', response.status);
        }
    } catch (error) {
        console.error('Error al cargar clientes:', error);
    }
}

// Mostrar clientes
function mostrarClientes() {
    // Limpiar el contenido anterior (excepto el botón de crear)
    const botonCrear = container.querySelector('button');
    container.innerHTML = '';
    if (botonCrear) {
        container.appendChild(botonCrear);
    }
    
    if (clientes.length === 0) {
        container.innerHTML += '<p>No hay clientes</p>';
        return;
    }
    
    let html = '<div class="clientes-lista">';
    clientes.forEach(cliente => {
        html += `
            <div class="cliente">
                <h3>${cliente.nombre}</h3>
                <p>Correo: ${cliente.correo}</p>
                <p>Teléfono: ${cliente.telefono}</p>
                <button onclick="editarCliente(${cliente.id})">Editar</button>
                <button onclick="eliminarCliente(${cliente.id})">Eliminar</button>
            </div>
        `;
    });
    html += '</div>';
    
    container.innerHTML += html;
}

// Crear cliente
async function crearCliente(clienteData) {
    try {
        const response = await fetch('http://localhost:3000/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clienteData)
        });
        
        if (response.ok) {
            Swal.fire('¡Éxito!', 'Cliente creado exitosamente', 'success');
            await cargarClientes();
        } else {
            const errorData = await response.text();
            Swal.fire('Error', `Error al crear cliente: ${errorData}`, 'error');
        }
    } catch (error) {
        console.error('Error al crear cliente:', error);
        Swal.fire('Error', 'Error de conexión al crear cliente', 'error');
    }
}

// Actualizar cliente
async function actualizarCliente(id, clienteData) {
    try {
        const response = await fetch(`http://localhost:3000/clientes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clienteData)
        });
        
        if (response.ok) {
            Swal.fire('¡Éxito!', 'Cliente actualizado exitosamente', 'success');
            await cargarClientes();
        } else {
            const errorData = await response.text();
            Swal.fire('Error', `Error al actualizar cliente: ${errorData}`, 'error');
        }
    } catch (error) {
        console.error('Error al actualizar cliente:', error);
        Swal.fire('Error', 'Error de conexión al actualizar cliente', 'error');
    }
}

// Eliminar cliente
async function eliminarCliente(id) {
    const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Estás seguro de que quieres eliminar este cliente?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
        try {
            const response = await fetch(`http://localhost:3000/clientes/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                Swal.fire('¡Eliminado!', 'Cliente eliminado exitosamente', 'success');
                await cargarClientes();
            } else {
                const errorData = await response.text();
                Swal.fire('Error', `Error al eliminar cliente: ${errorData}`, 'error');
            }
        } catch (error) {
            console.error('Error al eliminar cliente:', error);
            Swal.fire('Error', 'Error de conexión al eliminar cliente', 'error');
        }
    }
}

// Mostrar formulario para crear cliente
async function mostrarFormularioCrear() {
    const { value: formValues } = await Swal.fire({
        title: 'Crear Nuevo Cliente',
        html: `
            <input id="swal-nombre" class="swal2-input" placeholder="Nombre del cliente">
            <input id="swal-correo" class="swal2-input" type="email" placeholder="Correo electrónico">
            <input id="swal-telefono" class="swal2-input" placeholder="Teléfono">
        `,
        focusConfirm: false,
        preConfirm: () => {
            const nombre = document.getElementById('swal-nombre').value;
            const correo = document.getElementById('swal-correo').value;
            const telefono = document.getElementById('swal-telefono').value;
            
            if (!nombre || !correo || !telefono) {
                Swal.showValidationMessage('Todos los campos son requeridos');
                return false;
            }
            
            return {
                nombre: nombre,
                correo: correo,
                telefono: telefono
            };
        }
    });

    if (formValues) {
        await crearCliente(formValues);
    }
}

// Editar cliente con SweetAlert
async function editarCliente(id) {
    try {
        // Buscar el cliente en el array local
        const cliente = clientes.find(c => c.id == id);
        
        if (!cliente) {
            Swal.fire('Error', 'Cliente no encontrado', 'error');
            return;
        }
        
        const { value: formValues } = await Swal.fire({
            title: 'Editar Cliente',
            html: `
                <input id="swal-nombre" class="swal2-input" placeholder="Nombre del cliente" value="${cliente.nombre}">
                <input id="swal-correo" class="swal2-input" type="email" placeholder="Correo electrónico" value="${cliente.correo}">
                <input id="swal-telefono" class="swal2-input" placeholder="Teléfono" value="${cliente.telefono}">
            `,
            focusConfirm: false,
            preConfirm: () => {
                const nombre = document.getElementById('swal-nombre').value;
                const correo = document.getElementById('swal-correo').value;
                const telefono = document.getElementById('swal-telefono').value;
                
                if (!nombre || !correo || !telefono) {
                    Swal.showValidationMessage('Todos los campos son requeridos');
                    return false;
                }
                
                return {
                    nombre: nombre,
                    correo: correo,
                    telefono: telefono
                };
            }
        });

        if (formValues) {
            await actualizarCliente(id, formValues);
        }
    } catch (error) {
        console.error('Error al editar cliente:', error);
        Swal.fire('Error', 'No se pudo cargar el cliente para editar', 'error');
    }
}

// Hacer funciones disponibles globalmente
window.crearCliente = crearCliente;
window.actualizarCliente = actualizarCliente;
window.eliminarCliente = eliminarCliente;
window.editarCliente = editarCliente;
window.mostrarFormularioCrear = mostrarFormularioCrear;
