document.addEventListener('DOMContentLoaded', () => {
    const createButton = document.querySelector('.botonAgregar');
    const form = document.querySelector('form');
    const errorMessages = document.querySelector('#error-messages');


    function validateForm() {
        let errors = [];
        const title = form.querySelector('input[name="title"]');
        const rating = form.querySelector('input[name="rating"]');
        const awards = form.querySelector('input[name="awards"]');
        const release_date = form.querySelector('input[name="release_date"]');
        const length = form.querySelector('input[name="length"]');
        /*-------RESETEAR A CERO ERRORES PREVIOS, BORRARLOS------- */
        errorMessages.innerHTML = '';

        /*-------ACÁ VAN LAS VALIDACIONES------- */
        if (title.value.trim() === '') {
            errors.push('El campo título no puede estar vacío');
            title.style.borderColor = '#BB2D3B';
        } else {
            title.style.borderColor = '#ccc'; 
        }

        if (rating.value.trim() === '') {
            errors.push('El campo calificación no puede estar vacío');
            rating.style.borderColor = '#BB2D3B'; 
        } else if (isNaN(rating.value) || parseFloat(rating.value) <= 0 || parseFloat(rating.value) > 10.0) {
            errors.push('La calificación debe estar entre 0 y 10');
            rating.style.borderColor = '#BB2D3B'; 
        } else {
            rating.style.borderColor = '#ccc'; 
        }

        if (awards.value.trim() === '') {
            errors.push('El campo premios no puede estar vacío');
            awards.style.borderColor = '#BB2D3B'; 
        } else if (isNaN(awards.value) || parseInt(awards.value, 10) < 0) {
            errors.push('Los premios no pueden ser negativos');
            awards.style.borderColor = '#BB2D3B'; 
        } else {
            awards.style.borderColor = '#ccc'; 
        }

        if (release_date.value.trim() === '') {
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

        return errors;
    }

    /* ----------FUNCIÓN PARA ENVIAR FORMULARIO SI ESTÁ TODO OK------------ */
    async function submitForm() {
        const movieData = {
            title: form.querySelector('input[name="title"]').value,
            rating: parseFloat(form.querySelector('input[name="rating"]').value) || 0,
            awards: parseInt(form.querySelector('input[name="awards"]').value, 10) || 0,
            release_date: form.querySelector('input[name="release_date"]').value,
            length: parseInt(form.querySelector('input[name="length"]').value, 10) || 0
        };

        console.log('Datos de la película:', movieData); 

        const response = await fetch('/api/movies/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movieData)
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Película creada:', result);
        return result;
    }

    if (createButton) {
        createButton.addEventListener('click', async (event) => {
            event.preventDefault(); 
            const errors = validateForm();
            if (errors.length > 0) {
                errors.forEach(error => {
                    errorMessages.innerHTML += `<li>${error}</li>`;
                });
                return;
            }

        
            try {
                await submitForm();
                alert('Película creada exitosamente');
                window.location.href = '/listado'; // Redirigir a la lista de películas
            } catch (error) {
                console.error('Error al crear la película:', error);
                alert('Error al crear la película: ' + error.message);
            }
        });
    }
});




