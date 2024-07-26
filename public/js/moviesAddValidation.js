// document.addEventListener('DOMContentLoaded', () => {
//     const form = document.querySelector('form');
//     const errorMessages = document.querySelector('#error-messages');

//     // Función para cargar la lista de géneros en el select
//     async function loadGenres() {
//         try {
//             const response = await fetch('/api/genres');
//             if (!response.ok) {
//                 throw new Error(`Error ${response.status}: ${response.statusText}`);
//             }

//             const genres = await response.json();
//             const genreSelect = document.querySelector('#genre');

//             // Limpiar opciones previas
//             genreSelect.innerHTML = '';

//             // Añadir una opción por defecto
//             genreSelect.innerHTML += '<option value="">Seleccione un género</option>';

//             // Añadir opciones de géneros
//             genres.data.forEach(genre => {
//                 const option = document.createElement('option');
//                 option.value = genre.id;
//                 option.textContent = genre.name;
//                 genreSelect.appendChild(option);
//             });

//         } catch (error) {
//             console.error('Error al cargar los géneros:', error);
//         }
//     }

//     // Función para validar el formulario
//     function validateForm() {
//         let errors = [];
//         const title = form.querySelector('input[name="title"]');
//         const rating = form.querySelector('input[name="rating"]');
//         const awards = form.querySelector('input[name="awards"]');
//         const release_date = form.querySelector('input[name="release_date"]');
//         const length = form.querySelector('input[name="length"]');
//         const genre = form.querySelector('select[name="genre"]');

//         // Limpiar mensajes de error previos
//         errorMessages.innerHTML = '';

//         // Validaciones
//         if (title.value.trim() === '') {
//             errors.push('El campo título no puede estar vacío');
//             title.style.borderColor = '#BB2D3B'; // Error
//         } else {
//             title.style.borderColor = '#ccc'; // Normal
//         }

//         if (isNaN(rating.value) || parseFloat(rating.value) <= 0 || parseFloat(rating.value) > 10.0) {
//             errors.push('La calificación debe estar entre 0 y 10');
//             rating.style.borderColor = '#BB2D3B'; // Error
//         } else {
//             rating.style.borderColor = '#ccc'; // Normal
//         }

//         if (isNaN(awards.value) || parseInt(awards.value, 10) < 0) {
//             errors.push('Los premios no pueden ser negativos');
//             awards.style.borderColor = '#BB2D3B'; // Error
//         } else {
//             awards.style.borderColor = '#ccc'; // Normal
//         }

//         if (release_date.value === '') {
//             errors.push('La fecha de creación no puede estar vacía');
//             release_date.style.borderColor = '#BB2D3B'; // Error
//         } else {
//             release_date.style.borderColor = '#ccc'; // Normal
//         }

//         if (isNaN(length.value) || length.value < 60 || length.value > 360) {
//             errors.push('La duración debe estar entre 60 y 360 minutos');
//             length.style.borderColor = '#BB2D3B'; // Error
//         } else {
//             length.style.borderColor = '#ccc'; // Normal
//         }

//         if (genre.value === '') {
//             errors.push('Debe seleccionar un género');
//             genre.style.borderColor = '#BB2D3B'; // Error
//         } else {
//             genre.style.borderColor = '#ccc'; // Normal
//         }

//         return errors;
//     }

//     // Validar el formulario al hacer submit
//     form.addEventListener('submit', async (e) => {
//         const errors = validateForm();
//         if (errors.length > 0) {
//             e.preventDefault(); // Evitar el envío del formulario si hay errores
//             errors.forEach(error => {
//                 errorMessages.innerHTML += `<li>${error}</li>`;
//             });
//         } else {
//             // Enviar datos del formulario si no hay errores
//             const formData = {
//                 title: form.querySelector('input[name="title"]').value,
//                 rating: parseFloat(form.querySelector('input[name="rating"]').value),
//                 awards: parseInt(form.querySelector('input[name="awards"]').value, 10),
//                 release_date: form.querySelector('input[name="release_date"]').value,
//                 length: parseInt(form.querySelector('input[name="length"]').value, 10),
//                 genre: form.querySelector('select[name="genre"]').value
//             };

//             try {
//                 const response = await fetch('/api/movies/create', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify(formData)
//                 });

//                 if (!response.ok) {
//                     throw new Error(`Error ${response.status}: ${response.statusText}`);
//                 }

//                 const result = await response.json();
//                 console.log('Película creada:', result);
//                 alert('Película creada exitosamente');
//                 window.location.href = '/listado';
//             } catch (error) {
//                 console.error('Error al crear la película:', error);
//                 alert('Error al crear la película: ' + error.message);
//             }
//         }
//     });

//     // Cargar los géneros al cargar la página
//     loadGenres();
// });
















document.addEventListener('DOMContentLoaded', () => {
    const createButton = document.querySelector('.botonAgregar:nth-of-type(2)');
    const form = document.querySelector('form');
    const errorMessages = document.querySelector('#error-messages');

    // Función para validar el formulario
    function validateForm() {
        let errors = [];
        const title = form.querySelector('input[name="title"]');
        const rating = form.querySelector('input[name="rating"]');
        const awards = form.querySelector('input[name="awards"]');
        const release_date = form.querySelector('input[name="release_date"]');
        const length = form.querySelector('input[name="length"]');

        // Limpiar mensajes de error previos
        errorMessages.innerHTML = '';

        // Validaciones
        if (title.value.trim() === '') {
            errors.push('El campo título no puede estar vacío');
            title.style.borderColor = '#BB2D3B'; // Error
        } else {
            title.style.borderColor = '#ccc'; // Normal
        }

        if (rating.value.trim() === '') {
            errors.push('El campo calificación no puede estar vacío');
            rating.style.borderColor = '#BB2D3B'; // Error
        } else if (isNaN(rating.value) || parseFloat(rating.value) <= 0 || parseFloat(rating.value) > 10.0) {
            errors.push('La calificación debe estar entre 0 y 10');
            rating.style.borderColor = '#BB2D3B'; // Error
        } else {
            rating.style.borderColor = '#ccc'; // Normal
        }

        if (awards.value.trim() === '') {
            errors.push('El campo premios no puede estar vacío');
            awards.style.borderColor = '#BB2D3B'; // Error
        } else if (isNaN(awards.value) || parseInt(awards.value, 10) < 0) {
            errors.push('Los premios no pueden ser negativos');
            awards.style.borderColor = '#BB2D3B'; // Error
        } else {
            awards.style.borderColor = '#ccc'; // Normal
        }

        if (release_date.value.trim() === '') {
            errors.push('La fecha de creación no puede estar vacía');
            release_date.style.borderColor = '#BB2D3B'; // Error
        } else {
            release_date.style.borderColor = '#ccc'; // Normal
        }

        if (isNaN(length.value) || length.value < 60 || length.value > 360) {
            errors.push('La duración debe estar entre 60 y 360 minutos');
            length.style.borderColor = '#BB2D3B'; // Error
        } else {
            length.style.borderColor = '#ccc'; // Normal
        }

        return errors;
    }

    // Función para enviar el formulario
    async function submitForm() {
        const movieData = {
            title: form.querySelector('input[name="title"]').value,
            rating: parseFloat(form.querySelector('input[name="rating"]').value) || 0,
            awards: parseInt(form.querySelector('input[name="awards"]').value, 10) || 0,
            release_date: form.querySelector('input[name="release_date"]').value,
            length: parseInt(form.querySelector('input[name="length"]').value, 10) || 0
        };

        console.log('Datos de la película:', movieData); // Verifica los datos aquí

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
            event.preventDefault(); // Evitar el envío del formulario

            // Validar formulario
            const errors = validateForm();
            if (errors.length > 0) {
                errors.forEach(error => {
                    errorMessages.innerHTML += `<li>${error}</li>`;
                });
                return;
            }

            // Enviar formulario
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










// document.addEventListener('DOMContentLoaded', () => {
//     const createButton = document.querySelector('.botonAgregar:nth-of-type(2)');
//     const form = document.querySelector('form');
//     const errorMessages = document.querySelector('#error-messages');

//     // Función para validar el formulario
//     function validateForm() {
//         let errors = [];
//         const title = form.querySelector('input[name="title"]');
//         const rating = form.querySelector('input[name="rating"]');
//         const awards = form.querySelector('input[name="awards"]');
//         const release_date = form.querySelector('input[name="release_date"]');
//         const length = form.querySelector('input[name="length"]');

//         // Limpiar mensajes de error previos
//         errorMessages.innerHTML = '';

//         // Validaciones
//         if (title.value.trim() === '') {
//             errors.push('El campo título no puede estar vacío');
//             title.style.borderColor = '#BB2D3B'; // Error
//         } else {
//             title.style.borderColor = '#ccc'; // Normal
//         }

//         if (rating.value <= 0 || rating.value > 10.0) {
//             errors.push('La calificación debe estar entre 0 y 10');
//             rating.style.borderColor = '#BB2D3B'; // Error
//         } else {
//             rating.style.borderColor = '#ccc'; // Normal
//         }

//         if (awards.value < 0) {
//             errors.push('Los premios no pueden ser negativos');
//             awards.style.borderColor = '#BB2D3B'; // Error
//         } else {
//             awards.style.borderColor = '#ccc'; // Normal
//         }

//         if (release_date.value === '') {
//             errors.push('La fecha de creación no puede estar vacía');
//             release_date.style.borderColor = '#BB2D3B'; // Error
//         } else {
//             release_date.style.borderColor = '#ccc'; // Normal
//         }

//         if (length.value < 60 || length.value > 360) {
//             errors.push('La duración debe estar entre 60 y 360 minutos');
//             length.style.borderColor = '#BB2D3B'; // Error
//         } else {
//             length.style.borderColor = '#ccc'; // Normal
//         }

//         return errors;
//     }

//     // Función para enviar el formulario
//     async function submitForm() {
//         const movieData = {
//             title: form.querySelector('input[name="title"]').value,
//             rating: parseFloat(form.querySelector('input[name="rating"]').value) || 0,
//             awards: parseInt(form.querySelector('input[name="awards"]').value, 10) || 0,
//             release_date: form.querySelector('input[name="release_date"]').value,
//             length: parseInt(form.querySelector('input[name="length"]').value, 10) || 0
//         };

//         console.log('Datos de la película:', movieData); // Verifica los datos aquí

//         const response = await fetch('/api/movies/create', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(movieData)
//         });

//         if (!response.ok) {
//             throw new Error(`Error ${response.status}: ${response.statusText}`);
//         }

//         const result = await response.json();
//         console.log('Película creada:', result);
//         return result;
//     }

//     if (createButton) {
//         createButton.addEventListener('click', async (event) => {
//             event.preventDefault(); // Evitar el envío del formulario

//             // Validar formulario
//             const errors = validateForm();
//             if (errors.length > 0) {
//                 errors.forEach(error => {
//                     errorMessages.innerHTML += `<li>${error}</li>`;
//                 });
//                 return;
//             }

//             // Enviar formulario
//             try {
//                 const result = await submitForm();
//                 alert('Película creada exitosamente');
//                 window.location.href = 'http://localhost:3031/'; // Redirigir al home
//             } catch (error) {
//                 console.error('Error al crear la película:', error);
//                 alert('Error al crear la película: ' + error.message);
//             }
//         });
//     }
// });


