// Variables globales
let productos = [];

// Elementos del DOM
const container = document.querySelector('.container');

// Inicializar la página
document.addEventListener('DOMContentLoaded', async () => {
    await cargarProductos();
});

// Cargar productos
async function cargarProductos() {
    try {
        const response = await fetch('http://localhost:3000/productos');
        if (response.ok) {
            productos = await response.json();
            mostrarProductos();
        } else {
            console.error('Error al cargar productos:', response.status);
        }
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}

// Mostrar productos
function mostrarProductos() {
    // Limpiar el contenido anterior (excepto el botón de crear)
    const botonCrear = container.querySelector('button');
    container.innerHTML = '';
    if (botonCrear) {
        container.appendChild(botonCrear);
    }
    
    if (productos.length === 0) {
        container.innerHTML += '<p>No hay productos</p>';
        return;
    }
    
    let html = '<div class="productos-lista">';
    productos.forEach(producto => {
        html += `
            <div class="producto">
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <p>Stock: ${producto.stock}</p>
                <button onclick="editarProducto(${producto.id})">Editar</button>
                <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
            </div>
        `;
    });
    html += '</div>';
    
    container.innerHTML += html;
}

// Crear producto
async function crearProducto(productoData) {
    try {
        const response = await fetch('http://localhost:3000/productos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productoData)
        });
        
        if (response.ok) {
            Swal.fire('¡Éxito!', 'Producto creado exitosamente', 'success');
            await cargarProductos();
        } else {
            const errorData = await response.text();
            Swal.fire('Error', `Error al crear producto: ${errorData}`, 'error');
        }
    } catch (error) {
        console.error('Error al crear producto:', error);
        Swal.fire('Error', 'Error de conexión al crear producto', 'error');
    }
}



// Actualizar producto
async function actualizarProducto(id, productoData) {
    try {
        const response = await fetch(`http://localhost:3000/productos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productoData)
        });
        
        if (response.ok) {
            Swal.fire('¡Éxito!', 'Producto actualizado exitosamente', 'success');
            await cargarProductos();
        } else {
            const errorData = await response.text();
            Swal.fire('Error', `Error al actualizar producto: ${errorData}`, 'error');
        }
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        Swal.fire('Error', 'Error de conexión al actualizar producto', 'error');
    }
}

// Eliminar producto
async function eliminarProducto(id) {
    const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Estás seguro de que quieres eliminar este producto?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
        try {
            const response = await fetch(`http://localhost:3000/productos/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                Swal.fire('¡Eliminado!', 'Producto eliminado exitosamente', 'success');
                await cargarProductos();
            } else {
                const errorData = await response.text();
                Swal.fire('Error', `Error al eliminar producto: ${errorData}`, 'error');
            }
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            Swal.fire('Error', 'Error de conexión al eliminar producto', 'error');
        }
    }
}

// Mostrar formulario para crear producto
async function mostrarFormularioCrear() {
    const { value: formValues } = await Swal.fire({
        title: 'Crear Nuevo Producto',
        html: `
            <input id="swal-nombre" class="swal2-input" placeholder="Nombre del producto">
            <input id="swal-precio" class="swal2-input" type="number" step="0.01" placeholder="Precio">
            <input id="swal-stock" class="swal2-input" type="number" placeholder="Stock">
        `,
        focusConfirm: false,
        preConfirm: () => {
            const nombre = document.getElementById('swal-nombre').value;
            const precio = document.getElementById('swal-precio').value;
            const stock = document.getElementById('swal-stock').value;
            
            if (!nombre || !precio || !stock) {
                Swal.showValidationMessage('Todos los campos son requeridos');
                return false;
            }
            
            return {
                nombre: nombre,
                precio: parseFloat(precio),
                stock: parseInt(stock)
            };
        }
    });

    if (formValues) {
        await crearProducto(formValues);
    }
}

// Editar producto con SweetAlert
async function editarProducto(id) {
    try {
        // Buscar el producto en el array local
        const producto = productos.find(p => p.id == id);
        
        if (!producto) {
            Swal.fire('Error', 'Producto no encontrado', 'error');
            return;
        }
        
        const { value: formValues } = await Swal.fire({
            title: 'Editar Producto',
            html: `
                <input id="swal-nombre" class="swal2-input" placeholder="Nombre del producto" value="${producto.nombre}">
                <input id="swal-precio" class="swal2-input" type="number" step="0.01" placeholder="Precio" value="${producto.precio}">
                <input id="swal-stock" class="swal2-input" type="number" placeholder="Stock" value="${producto.stock}">
            `,
            focusConfirm: false,
            preConfirm: () => {
                const nombre = document.getElementById('swal-nombre').value;
                const precio = document.getElementById('swal-precio').value;
                const stock = document.getElementById('swal-stock').value;
                
                if (!nombre || !precio || !stock) {
                    Swal.showValidationMessage('Todos los campos son requeridos');
                    return false;
                }
                
                return {
                    nombre: nombre,
                    precio: parseFloat(precio),
                    stock: parseInt(stock)
                };
            }
        });

        if (formValues) {
            await actualizarProducto(id, formValues);
        }
    } catch (error) {
        console.error('Error al editar producto:', error);
        Swal.fire('Error', 'No se pudo cargar el producto para editar', 'error');
    }
}

// Hacer funciones disponibles globalmente
window.crearProducto = crearProducto;
window.actualizarProducto = actualizarProducto;
window.eliminarProducto = eliminarProducto;
window.editarProducto = editarProducto;
window.mostrarFormularioCrear = mostrarFormularioCrear;
