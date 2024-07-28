
document.addEventListener('DOMContentLoaded', () => {

    const createButton = document.querySelector('.botonAgregar:nth-of-type(2)');

    if (createButton) {
        
        createButton.addEventListener('click', (event) => {
            event.preventDefault();

   
            const pathParts = window.location.pathname.split('/');
            const movieId = pathParts[pathParts.length - 1];
            
       
            if (movieId && !isNaN(movieId)) {
                window.location.href = '/formularios';
            } else {
                console.log('Ya estás en la ruta del formulario vacío.');
            }
        });
    }
});