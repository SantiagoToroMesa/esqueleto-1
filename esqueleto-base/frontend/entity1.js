// Global variables
let entities = [];

// DOM elements
const entityList = document.getElementById('entity-list');

// Initialize page
document.addEventListener('DOMContentLoaded', async () => {
    await loadEntities();
});

// Load entities
async function loadEntities() {
    try {
        const response = await fetch('http://localhost:3000/entity1');
        if (response.ok) {
            entities = await response.json();
            displayEntities();
        } else {
            console.error('Error loading entities:', response.status);
            Swal.fire('Error', 'Failed to load entities', 'error');
        }
    } catch (error) {
        console.error('Error loading entities:', error);
        Swal.fire('Error', 'Connection error while loading entities', 'error');
    }
}

// Display entities
function displayEntities() {
    if (entities.length === 0) {
        entityList.innerHTML = '<p>No entities found</p>';
        return;
    }
    
    let html = '';
    entities.forEach(entity => {
        html += `
            <div class="entity-item">
                <h3>${entity.name}</h3>
                <p><strong>Description:</strong> ${entity.description || 'No description'}</p>
                <p><strong>ID:</strong> ${entity.id}</p>
                <button onclick="editEntity(${entity.id})" class="btn btn-edit">Edit</button>
                <button onclick="deleteEntity(${entity.id})" class="btn btn-delete">Delete</button>
            </div>
        `;
    });
    
    entityList.innerHTML = html;
}

// Create entity
async function createEntity(entityData) {
    try {
        const response = await fetch('http://localhost:3000/entity1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entityData)
        });
        
        if (response.ok) {
            Swal.fire('Success!', 'Entity created successfully', 'success');
            await loadEntities();
        } else {
            const errorData = await response.text();
            Swal.fire('Error', `Failed to create entity: ${errorData}`, 'error');
        }
    } catch (error) {
        console.error('Error creating entity:', error);
        Swal.fire('Error', 'Connection error while creating entity', 'error');
    }
}

// Update entity
async function updateEntity(id, entityData) {
    try {
        const response = await fetch(`http://localhost:3000/entity1/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entityData)
        });
        
        if (response.ok) {
            Swal.fire('Success!', 'Entity updated successfully', 'success');
            await loadEntities();
        } else {
            const errorData = await response.text();
            Swal.fire('Error', `Failed to update entity: ${errorData}`, 'error');
        }
    } catch (error) {
        console.error('Error updating entity:', error);
        Swal.fire('Error', 'Connection error while updating entity', 'error');
    }
}

// Delete entity
async function deleteEntity(id) {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: "Are you sure you want to delete this entity?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete',
        cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
        try {
            const response = await fetch(`http://localhost:3000/entity1/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                Swal.fire('Deleted!', 'Entity deleted successfully', 'success');
                await loadEntities();
            } else {
                const errorData = await response.text();
                Swal.fire('Error', `Failed to delete entity: ${errorData}`, 'error');
            }
        } catch (error) {
            console.error('Error deleting entity:', error);
            Swal.fire('Error', 'Connection error while deleting entity', 'error');
        }
    }
}

// Show create form
async function mostrarFormularioCrear() {
    const { value: formValues } = await Swal.fire({
        title: 'Create New Entity 1',
        html: `
            <input id="swal-name" class="swal2-input" placeholder="Entity name">
            <textarea id="swal-description" class="swal2-textarea" placeholder="Description (optional)"></textarea>
        `,
        focusConfirm: false,
        preConfirm: () => {
            const name = document.getElementById('swal-name').value;
            const description = document.getElementById('swal-description').value;
            
            if (!name) {
                Swal.showValidationMessage('Name is required');
                return false;
            }
            
            return {
                name: name,
                description: description
            };
        }
    });

    if (formValues) {
        await createEntity(formValues);
    }
}

// Edit entity
async function editEntity(id) {
    try {
        // Find entity in local array
        const entity = entities.find(e => e.id == id);
        
        if (!entity) {
            Swal.fire('Error', 'Entity not found', 'error');
            return;
        }
        
        const { value: formValues } = await Swal.fire({
            title: 'Edit Entity 1',
            html: `
                <input id="swal-name" class="swal2-input" placeholder="Entity name" value="${entity.name}">
                <textarea id="swal-description" class="swal2-textarea" placeholder="Description (optional)">${entity.description || ''}</textarea>
            `,
            focusConfirm: false,
            preConfirm: () => {
                const name = document.getElementById('swal-name').value;
                const description = document.getElementById('swal-description').value;
                
                if (!name) {
                    Swal.showValidationMessage('Name is required');
                    return false;
                }
                
                return {
                    name: name,
                    description: description
                };
            }
        });

        if (formValues) {
            await updateEntity(id, formValues);
        }
    } catch (error) {
        console.error('Error editing entity:', error);
        Swal.fire('Error', 'Failed to load entity for editing', 'error');
    }
}

// Make functions globally available
window.createEntity = createEntity;
window.updateEntity = updateEntity;
window.deleteEntity = deleteEntity;
window.editEntity = editEntity;
window.mostrarFormularioCrear = mostrarFormularioCrear;
