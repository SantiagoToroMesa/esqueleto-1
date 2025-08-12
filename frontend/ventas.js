// Variables globales
let ventas = [];
let clientes = [];
let productos = [];

// Elementos del DOM
const container = document.querySelector('.container');

// Inicializar la página
document.addEventListener('DOMContentLoaded', async () => {
    await cargarDatos();
});

// Cargar todos los datos necesarios
async function cargarDatos() {
    try {
        // Cargar ventas, clientes y productos en paralelo
        const [ventasResponse, clientesResponse, productosResponse] = await Promise.all([
            fetch('http://localhost:3000/ventas'),
            fetch('http://localhost:3000/clientes'),
            fetch('http://localhost:3000/productos')
        ]);

        if (ventasResponse.ok && clientesResponse.ok && productosResponse.ok) {
            ventas = await ventasResponse.json();
            clientes = await clientesResponse.json();
            productos = await productosResponse.json();
            mostrarVentas();
        } else {
            console.error('Error al cargar datos');
        }
    } catch (error) {
        console.error('Error al cargar datos:', error);
    }
}

// Mostrar ventas
function mostrarVentas() {
    // Limpiar el contenido anterior (excepto el botón de crear)
    const botonCrear = container.querySelector('button');
    container.innerHTML = '';
    if (botonCrear) {
        container.appendChild(botonCrear);
    }
    
    if (ventas.length === 0) {
        container.innerHTML += '<p>No hay ventas</p>';
        return;
    }
    
    let html = '<div class="ventas-lista">';
    ventas.forEach(venta => {
        // Buscar cliente y producto
        const cliente = clientes.find(c => c.id == venta.cliente_id);
        const producto = productos.find(p => p.id == venta.producto_id);
        
        html += `
            <div class="venta">
                <h3>Venta #${venta.id}</h3>
                <p>Cliente: ${cliente ? cliente.nombre : 'Cliente no encontrado'}</p>
                <p>Producto: ${producto ? producto.nombre : 'Producto no encontrado'}</p>
                <p>Cantidad: ${venta.cantidad}</p>
                <p>Total: $${producto ? (producto.precio * venta.cantidad).toFixed(2) : 'N/A'}</p>
                <button onclick="editarVenta(${venta.id})">Editar</button>
                <button onclick="eliminarVenta(${venta.id})">Eliminar</button>
            </div>
        `;
    });
    html += '</div>';
    
    container.innerHTML += html;
}

// Crear venta
async function crearVenta(ventaData) {
    try {
        const response = await fetch('http://localhost:3000/ventas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ventaData)
        });
        
        if (response.ok) {
            Swal.fire('¡Éxito!', 'Venta creada exitosamente', 'success');
            await cargarDatos();
        } else {
            const errorData = await response.text();
            Swal.fire('Error', `Error al crear venta: ${errorData}`, 'error');
        }
    } catch (error) {
        console.error('Error al crear venta:', error);
        Swal.fire('Error', 'Error de conexión al crear venta', 'error');
    }
}

// Actualizar venta
async function actualizarVenta(id, ventaData) {
    try {
        const response = await fetch(`http://localhost:3000/ventas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ventaData)
        });
        
        if (response.ok) {
            Swal.fire('¡Éxito!', 'Venta actualizada exitosamente', 'success');
            await cargarDatos();
        } else {
            const errorData = await response.text();
            Swal.fire('Error', `Error al actualizar venta: ${errorData}`, 'error');
        }
    } catch (error) {
        console.error('Error al actualizar venta:', error);
        Swal.fire('Error', 'Error de conexión al actualizar venta', 'error');
    }
}

// Eliminar venta
async function eliminarVenta(id) {
    const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Estás seguro de que quieres eliminar esta venta?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
        try {
            const response = await fetch(`http://localhost:3000/ventas/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                Swal.fire('¡Eliminado!', 'Venta eliminada exitosamente', 'success');
                await cargarDatos();
            } else {
                const errorData = await response.text();
                Swal.fire('Error', `Error al eliminar venta: ${errorData}`, 'error');
            }
        } catch (error) {
            console.error('Error al eliminar venta:', error);
            Swal.fire('Error', 'Error de conexión al eliminar venta', 'error');
        }
    }
}

// Generar opciones para selectores
function generarOpcionesClientes() {
    return clientes.map(cliente => 
        `<option value="${cliente.id}">${cliente.nombre} (${cliente.correo})</option>`
    ).join('');
}

function generarOpcionesProductos() {
    return productos.map(producto => 
        `<option value="${producto.id}">${producto.nombre} - $${producto.precio}</option>`
    ).join('');
}

// Mostrar formulario para crear venta
async function mostrarFormularioCrear() {
    const { value: formValues } = await Swal.fire({
        title: 'Crear Nueva Venta',
        html: `
            <select id="swal-cliente" class="swal2-input">
                <option value="">Seleccionar cliente</option>
                ${generarOpcionesClientes()}
            </select>
            <select id="swal-producto" class="swal2-input">
                <option value="">Seleccionar producto</option>
                ${generarOpcionesProductos()}
            </select>
            <input id="swal-cantidad" class="swal2-input" type="number" min="1" placeholder="Cantidad">
        `,
        focusConfirm: false,
        preConfirm: () => {
            const cliente_id = document.getElementById('swal-cliente').value;
            const producto_id = document.getElementById('swal-producto').value;
            const cantidad = document.getElementById('swal-cantidad').value;
            
            if (!cliente_id || !producto_id || !cantidad) {
                Swal.showValidationMessage('Todos los campos son requeridos');
                return false;
            }
            
            return {
                cliente_id: parseInt(cliente_id),
                producto_id: parseInt(producto_id),
                cantidad: parseInt(cantidad)
            };
        }
    });

    if (formValues) {
        await crearVenta(formValues);
    }
}

// Editar venta con SweetAlert
async function editarVenta(id) {
    try {
        // Buscar la venta en el array local
        const venta = ventas.find(v => v.id == id);
        
        if (!venta) {
            Swal.fire('Error', 'Venta no encontrada', 'error');
            return;
        }
        
        const { value: formValues } = await Swal.fire({
            title: 'Editar Venta',
            html: `
                <select id="swal-cliente" class="swal2-input">
                    <option value="">Seleccionar cliente</option>
                    ${generarOpcionesClientes()}
                </select>
                <select id="swal-producto" class="swal2-input">
                    <option value="">Seleccionar producto</option>
                    ${generarOpcionesProductos()}
                </select>
                <input id="swal-cantidad" class="swal2-input" type="number" min="1" placeholder="Cantidad" value="${venta.cantidad}">
            `,
            focusConfirm: false,
            didOpen: () => {
                // Establecer valores por defecto
                document.getElementById('swal-cliente').value = venta.cliente_id;
                document.getElementById('swal-producto').value = venta.producto_id;
            },
            preConfirm: () => {
                const cliente_id = document.getElementById('swal-cliente').value;
                const producto_id = document.getElementById('swal-producto').value;
                const cantidad = document.getElementById('swal-cantidad').value;
                
                if (!cliente_id || !producto_id || !cantidad) {
                    Swal.showValidationMessage('Todos los campos son requeridos');
                    return false;
                }
                
                return {
                    cliente_id: parseInt(cliente_id),
                    producto_id: parseInt(producto_id),
                    cantidad: parseInt(cantidad)
                };
            }
        });

        if (formValues) {
            await actualizarVenta(id, formValues);
        }
    } catch (error) {
        console.error('Error al editar venta:', error);
        Swal.fire('Error', 'No se pudo cargar la venta para editar', 'error');
    }
}

// Hacer funciones disponibles globalmente
window.crearVenta = crearVenta;
window.actualizarVenta = actualizarVenta;
window.eliminarVenta = eliminarVenta;
window.editarVenta = editarVenta;
window.mostrarFormularioCrear = mostrarFormularioCrear;
