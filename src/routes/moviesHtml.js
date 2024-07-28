const express = require('express');
const router = express.Router();
const moviesHtmlController = require('../controllers/moviesHtmlController');
const moviesHtmlFormularioController = require('../controllers/moviesHtmlFormularioController')
const moviesHtmlIndexController = require('../controllers/moviesHtmlIndexController')
const moviesHtmlFormularioCreateController = require('../controllers/moviesHtmlFormularioCreateController')
const moviesHtmlFavoritasController = require('../controllers/moviesHtmlFavoritasController')
//const moviesAPIController = require('../controllers/api/moviesAPIController')

//Rutas
//primera página
router.get('/', moviesHtmlIndexController.index);
//Listado de películas
router.get('/listado', moviesHtmlController.home);
//router.get('/formularios', moviesHtmlFormularioController.form)
router.get('/formularios', moviesHtmlFormularioCreateController.formCreate);
router.get('/formularios/:id', moviesHtmlFormularioController.form);
//películas favoritas
router.get('/favoritas', moviesHtmlFavoritasController.favorites)




// Obtener detalles de una película específica
//router.get('/api/movies/:id', moviesAPIController.detail);
// Crear una nueva película
//router.post('/api/movies/create', moviesAPIController.create);
// Actualizar una película existente
//router.put('/api/movies/update/:id', moviesAPIController.update);
// Eliminar una película
//router.delete('/api/movies/:id', moviesAPIController.destroy);

//Detalle de una película
// //router.get('/:id', moviesAPIController.detail);
// //Filtrar películas por rating. Puede colocar desde 1 hasta 10
// router.get('/recomended/:rating', moviesAPIController.recomended);
// //Agregar una película
// router.post('/create', moviesAPIController.create);
// //Modificar una película
// router.put('/update/:id', moviesAPIController.update);
// //Eliminar una película
// router.delete('/delete/:id', moviesAPIController.destroy);

module.exports = router;