document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const errorMessages = document.querySelector('#error-messages');

    async function loadGenres() {
        try {
            const response = await fetch('/api/genres');
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            const genreSelect = document.querySelector('#genre');
            genreSelect.innerHTML = '<option value="">Seleccione un género</option>';

            data.data.forEach(genre => {
                const option = document.createElement('option');
                option.value = genre.id;
                option.textContent = genre.name;
                genreSelect.appendChild(option);
            });

        } catch (error) {
            console.error('Error al cargar los géneros:', error);
        }
    }

    function validateForm() {
        let errors = [];
        const title = form.querySelector('input[name="title"]');
        const rating = form.querySelector('input[name="rating"]');
        const awards = form.querySelector('input[name="awards"]');
        const release_date = form.querySelector('input[name="release_date"]');
        const length = form.querySelector('input[name="length"]');
        const genre = form.querySelector('select[name="genre"]');

        errorMessages.innerHTML = '';

        if (title.value.trim() === '') {
            errors.push('El campo título no puede estar vacío');
            title.style.borderColor = '#BB2D3B';
        } else {
            title.style.borderColor = '#ccc';
        }

        if (isNaN(rating.value) || parseFloat(rating.value) <= 0 || parseFloat(rating.value) > 10.0) {
            errors.push('La calificación debe estar entre 0 y 10');
            rating.style.borderColor = '#BB2D3B';
        } else {
            rating.style.borderColor = '#ccc';
        }

        if (isNaN(awards.value) || parseInt(awards.value, 10) < 0) {
            errors.push('Los premios no pueden ser negativos');
            awards.style.borderColor = '#BB2D3B';
        } else {
            awards.style.borderColor = '#ccc';
        }

        if (release_date.value === '') {
            errors.push('La fecha de creación no puede estar vacía');
            release_date.style.borderColor = '#BB2D3B';
        } else {
            release_date.style.borderColor = '#ccc';
        }

        if (isNaN(length.value) || length.value < 60 || length.value > 360) {
            errors.push('La duración debe estar entre 60 y 360 minutos');
            length.style.borderColor = '#BB2D3B';
        } else {
            length.style.borderColor = '#ccc';
        }

        if (genre.value === '') {
            errors.push('Debe seleccionar un género');
            genre.style.borderColor = '#BB2D3B';
        } else {
            genre.style.borderColor = '#ccc';
        }

        return errors;
    }

    form.addEventListener('submit', async (e) => {
        const errors = validateForm();
        if (errors.length > 0) {
            e.preventDefault();
            errors.forEach(error => {
                errorMessages.innerHTML += `<li>${error}</li>`;
            });
        } else {
            const formData = {
                title: form.querySelector('input[name="title"]').value,
                rating: parseFloat(form.querySelector('input[name="rating"]').value),
                awards: parseInt(form.querySelector('input[name="awards"]').value, 10),
                release_date: form.querySelector('input[name="release_date"]').value,
                length: parseInt(form.querySelector('input[name="length"]').value, 10),
                genre_id: form.querySelector('select[name="genre"]').value 
            };

            try {
                const response = await fetch('/api/movies/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const result = await response.json();
                console.log('Película creada:', result);
                alert('Película creada exitosamente');
                window.location.href = '/listado';
            } catch (error) {
                console.error('Error al crear la película:', error);
                alert('Error al crear la película: ' + error.message);
            }
        }
    });

    loadGenres();
});


