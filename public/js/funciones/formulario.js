window.onload = async () => {
    const pathParts = window.location.pathname.split('/');
    const movieId = pathParts[pathParts.length - 1];

    // Cargar los géneros disponibles
    await loadGenres();

    // Si hay un ID de película en la URL, cargar sus datos
    if (movieId) {
        try {
            const response = await fetch(`/api/movies/${movieId}`);
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const movie = await response.json();
            if (movie && movie.data) {
                const movieData = movie.data;
                populateForm(movieData);
            } else {
                console.error('No se encontraron datos de la película.');
                resetForm();
            }
        } catch (error) {
            console.error('Error al obtener datos de la película:', error);
            resetForm();
        }
    } else {
        resetForm();
    }
};

// Función para cargar la lista de géneros en el select

async function loadGenres() {
    try {
        const response = await fetch('/api/genres'); // Cambia esta URL si es necesario
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const genres = await response.json();
        const genreSelect = document.querySelector('#genre');

        // Limpiar opciones previas
        genreSelect.innerHTML = '';

        // Añadir una opción por defecto
        genreSelect.innerHTML += '<option value="">Seleccione un género</option>';

        // Añadir opciones de géneros
        genres.data.forEach(genre => {
            const option = document.createElement('option');
            option.value = genre.id;
            option.textContent = genre.name;
            genreSelect.appendChild(option);
        });

    } catch (error) {
        console.error('Error al cargar los géneros:', error);
    }
}

// Función para llenar el formulario con los datos de la película
function populateForm(movieData) {
    document.querySelector('input[name="id"]').value = movieData.id || '';
    document.querySelector('input[name="title"]').value = movieData.title || '';
    document.querySelector('input[name="rating"]').value = movieData.rating || '';
    document.querySelector('input[name="awards"]').value = movieData.awards || '';
    document.querySelector('input[name="release_date"]').value = movieData.release_date ? new Date(movieData.release_date).toISOString().split('T')[0] : '';
    document.querySelector('input[name="length"]').value = movieData.length || '';

    // Seleccionar el género correcto
    const genreSelect = document.querySelector('#genre');
    if (movieData.genre) {
        genreSelect.value = movieData.genre.id || ''; // Asegúrate de que esto coincida con el valor del select
    } else {
        genreSelect.value = ''; // Opción por defecto si no hay género
    }
}



// Función para resetear el formulario
function resetForm() {
    document.querySelector('input[name="id"]').value = '';
    document.querySelector('input[name="title"]').value = '';
    document.querySelector('input[name="rating"]').value = '';
    document.querySelector('input[name="awards"]').value = '';
    document.querySelector('input[name="release_date"]').value = '';
    document.querySelector('input[name="length"]').value = '';
    document.querySelector('#genre').value = ''; // Resetear el select
}

// Función para manejar el evento de clic en el botón de editar
async function handleEdit(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del botón de formulario

    const form = document.querySelector('form');
    const movieId = form.querySelector('input[name="id"]').value;

    if (!movieId) {
        alert('No se puede editar. No se ha encontrado el ID de la película.');
        return;
    }

    const movieData = {
        title: form.querySelector('input[name="title"]').value,
        rating: parseFloat(form.querySelector('input[name="rating"]').value) || 0,
        awards: parseInt(form.querySelector('input[name="awards"]').value, 10) || 0,
        release_date: form.querySelector('input[name="release_date"]').value,
        length: parseInt(form.querySelector('input[name="length"]').value, 10) || 0,
        genre: form.querySelector('select[name="genre"]').value // Añadido género al envío
    };

    try {
        const response = await fetch(`/api/movies/update/${movieId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movieData)
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Película actualizada:', result);
        alert('Película actualizada exitosamente');
        window.location.href = '/listado';
    } catch (error) {
        console.error('Error al actualizar la película:', error);
        alert('Error al actualizar la película: ' + error.message);
    }
}

// Función para manejar el evento de clic en el botón de eliminar
async function handleDelete(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del botón de formulario

    const form = document.querySelector('form');
    const movieId = form.querySelector('input[name="id"]').value;

    if (!movieId) {
        alert('No se puede eliminar. No se ha encontrado el ID de la película.');
        return;
    }

    if (!confirm('¿Estás seguro de que deseas eliminar esta película?')) {
        return;
    }

    try {
        const response = await fetch(`/api/movies/delete/${movieId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.message}`);
        }

        const result = await response.json();
        console.log('Película eliminada:', result);
        alert('Película eliminada exitosamente');
        window.location.href = '/listado';
    } catch (error) {
        console.error('Error al eliminar la película:', error);
        alert('Error al eliminar la película: ' + error.message);
    }
}

// Configurar los eventos cuando el contenido del documento esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.botonAgregar').addEventListener('click', handleEdit);
    document.querySelector('.botonBorrar').addEventListener('click', handleDelete);
});






// window.onload = async () => {
//     const pathParts = window.location.pathname.split('/');
//     const movieId = pathParts[pathParts.length - 1];

//     // Si hay un ID de película en la URL, cargar sus datos
//     if (movieId) {
//         try {
//             const response = await fetch(`/api/movies/${movieId}`);
//             if (!response.ok) {
//                 throw new Error(`Error ${response.status}: ${response.statusText}`);
//             }

//             const movie = await response.json();
//             if (movie && movie.data) {
//                 const movieData = movie.data;
//                 populateForm(movieData);
//             } else {
//                 console.error('No se encontraron datos de la película.');
//                 resetForm();
//             }
//         } catch (error) {
//             console.error('Error al obtener datos de la película:', error);
//             resetForm();
//         }
//     } else {
//         resetForm();
//     }
// };

// // Función para llenar el formulario con los datos de la película
// function populateForm(movieData) {
//     document.querySelector('input[name="id"]').value = movieData.id || '';
//     document.querySelector('input[name="title"]').value = movieData.title || '';
//     document.querySelector('input[name="rating"]').value = movieData.rating || '';
//     document.querySelector('input[name="awards"]').value = movieData.awards || '';
//     document.querySelector('input[name="release_date"]').value = movieData.release_date ? new Date(movieData.release_date).toISOString().split('T')[0] : '';
//     document.querySelector('input[name="length"]').value = movieData.length || '';
// }

// // Función para resetear el formulario
// function resetForm() {
//     document.querySelector('input[name="id"]').value = '';
//     document.querySelector('input[name="title"]').value = '';
//     document.querySelector('input[name="rating"]').value = '';
//     document.querySelector('input[name="awards"]').value = '';
//     document.querySelector('input[name="release_date"]').value = '';
//     document.querySelector('input[name="length"]').value = '';
// }

// // Función para manejar el evento de clic en el botón de editar
// async function handleEdit(event) {
//     event.preventDefault(); // Prevenir el comportamiento por defecto del botón de formulario

//     const form = document.querySelector('form');
//     const movieId = form.querySelector('input[name="id"]').value;

//     if (!movieId) {
//         alert('No se puede editar. No se ha encontrado el ID de la película.');
//         return;
//     }

//     const movieData = {
//         title: form.querySelector('input[name="title"]').value,
//         rating: parseFloat(form.querySelector('input[name="rating"]').value) || 0,
//         awards: parseInt(form.querySelector('input[name="awards"]').value, 10) || 0,
//         release_date: form.querySelector('input[name="release_date"]').value,
//         length: parseInt(form.querySelector('input[name="length"]').value, 10) || 0
//     };

//     try {
//         const response = await fetch(`/api/movies/update/${movieId}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(movieData)
//         });

//         if (!response.ok) {
//             throw new Error(`Error ${response.status}: ${response.statusText}`);
//         }

//         const result = await response.json();
//         console.log('Película actualizada:', result);
//         alert('Película actualizada exitosamente');
//         window.location.href = '/listado';
//     } catch (error) {
//         console.error('Error al actualizar la película:', error);
//         alert('Error al actualizar la película: ' + error.message);
//     }
// }

// // Función para manejar el evento de clic en el botón de eliminar
// async function handleDelete(event) {
//     event.preventDefault(); // Prevenir el comportamiento por defecto del botón de formulario

//     const form = document.querySelector('form');
//     const movieId = form.querySelector('input[name="id"]').value;

//     if (!movieId) {
//         alert('No se puede eliminar. No se ha encontrado el ID de la película.');
//         return;
//     }

//     if (!confirm('¿Estás seguro de que deseas eliminar esta película?')) {
//         return;
//     }

//     try {
//         const response = await fetch(`/api/movies/delete/${movieId}`, {
//             method: 'DELETE'
//         });

//         if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(`Error ${response.status}: ${errorData.message}`);
//         }

//         const result = await response.json();
//         console.log('Película eliminada:', result);
//         alert('Película eliminada exitosamente');
//         window.location.href = '/listado';
//     } catch (error) {
//         console.error('Error al eliminar la película:', error);
//         alert('Error al eliminar la película: ' + error.message);
//     }
// }

// // Configurar los eventos cuando el contenido del documento esté completamente cargado
// document.addEventListener('DOMContentLoaded', () => {
//     document.querySelector('.botonAgregar').addEventListener('click', handleEdit);
//     document.querySelector('.botonBorrar').addEventListener('click', handleDelete);
// });


