window.onload = async () => {
    const pathParts = window.location.pathname.split('/');
    const movieId = pathParts[pathParts.length - 1];

    
    await loadGenres();

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



async function loadGenres() {
    try {
        const response = await fetch('/api/genres'); 
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const genres = await response.json();
        const genreSelect = document.querySelector('#genre');

      
        genreSelect.innerHTML = '';

     
        genreSelect.innerHTML += '<option value="">Seleccione un género</option>';

   
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


function populateForm(movieData) {
    document.querySelector('input[name="id"]').value = movieData.id || '';
    document.querySelector('input[name="title"]').value = movieData.title || '';
    document.querySelector('input[name="rating"]').value = movieData.rating || '';
    document.querySelector('input[name="awards"]').value = movieData.awards || '';
    document.querySelector('input[name="release_date"]').value = movieData.release_date ? new Date(movieData.release_date).toISOString().split('T')[0] : '';
    document.querySelector('input[name="length"]').value = movieData.length || '';


    const genreSelect = document.querySelector('#genre');
    if (movieData.genre) {
        genreSelect.value = movieData.genre.id || ''; 
    } else {
        genreSelect.value = ''; 
    }
}




function resetForm() {
    document.querySelector('input[name="id"]').value = '';
    document.querySelector('input[name="title"]').value = '';
    document.querySelector('input[name="rating"]').value = '';
    document.querySelector('input[name="awards"]').value = '';
    document.querySelector('input[name="release_date"]').value = '';
    document.querySelector('input[name="length"]').value = '';
    document.querySelector('#genre').value = ''; 
}


async function handleEdit(event) {
    event.preventDefault(); 

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
        genre: form.querySelector('select[name="genre"]').value 
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


async function handleDelete(event) {
    event.preventDefault();

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


document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.botonAgregar').addEventListener('click', handleEdit);
    document.querySelector('.botonBorrar').addEventListener('click', handleDelete);
});






