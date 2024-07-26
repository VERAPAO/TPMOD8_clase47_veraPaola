// Esperar a que el contenido del documento esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Obtener el botón "Crear"
    const createButton = document.querySelector('.botonAgregar:nth-of-type(2)');
    
    // Si el botón "Crear" existe
    if (createButton) {
        // Añadir un listener al clic del botón
        createButton.addEventListener('click', (event) => {
            // Evitar que el botón envíe el formulario
            event.preventDefault();

            // Obtener el ID de la ruta actual
            const pathParts = window.location.pathname.split('/');
            const movieId = pathParts[pathParts.length - 1];
            
            // Verificar si estamos en una ruta con un ID
            if (movieId && !isNaN(movieId)) {
                // Redirigir a la ruta del formulario vacío
                window.location.href = '/formularios';
            } else {
                // Si ya estamos en la ruta de formulario vacío, puedes manejarlo aquí si es necesario
                // o simplemente no hacer nada
                console.log('Ya estás en la ruta del formulario vacío.');
            }
        });
    }
});