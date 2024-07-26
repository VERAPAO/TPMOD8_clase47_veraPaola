const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');


//Aqui tienen otra forma de llamar a cada uno de los modelos
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;


const moviesAPIController = {
    'list': (req, res) => {
        db.Movie.findAll({
            include: ['genre']
        })
        .then(movies => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: movies.length,
                    url: 'api/movies'
                },
                data: movies
            }
                res.json(respuesta);
            })
    },
    
    'detail': (req, res) => {
    db.Movie.findByPk(req.params.id, {
        include: ['genre']
    })
    .then(movie => {
        let respuesta = {
            meta: {
                status: 200,
                total: movie ? 1 : 0,  
                url: '/api/movies/:id'
            },
            data: movie
        };
        res.json(respuesta);
    })
    .catch(error => {
  
        res.status(500).json({
            meta: {
                status: 500,
                url: '/api/movies/:id'
            },
            data: null,
            message: 'Error interno del servidor'
        });
    });
},
    'recomended': (req, res) => {
        db.Movie.findAll({
            include: ['genre'],
            where: {
                rating: {[db.Sequelize.Op.gte] : req.params.rating}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
        .then(movies => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: movies.length,
                    url: 'api/movies/recomended/:rating'
                },
                data: movies
            }
                res.json(respuesta);
        })
        .catch(error => console.log(error))
    },
    create: (req,res) => {
        
        console.log('create',req.body, req.params)
        Movies
        .create(
            {
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
            }
        )
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/movies/create'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/movies/create'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })    
        .catch(error => res.send(error))
    },
    update: (req,res) => {
        let movieId = req.params.id;
        console.log(movieId)
        console.log(req.body)
        Movies.update(
            {
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
            },
            {
                where: {id: movieId}
        })
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/movies/:id'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 204,
                        total: confirm.length,
                        url: 'api/movies/update/:id'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })    
        .catch(error => res.send(error))
    },
    destroy: async (req, res) => {
        let movieId = req.params.id;
        console.log('ID de película:', movieId);
    
        try {
            
            await sequelize.query(
                'UPDATE actors SET favorite_movie_id = NULL WHERE favorite_movie_id = ?',
                {
                    replacements: [movieId],
                    type: sequelize.QueryTypes.UPDATE
                }
            );
    
            
            await sequelize.query(
                'DELETE FROM actor_movie WHERE movie_id = ?',
                {
                    replacements: [movieId],
                    type: sequelize.QueryTypes.DELETE
                }
            );
    
       
            const deleteCount = await db.Movie.destroy({
                where: { id: movieId },
                force: true  
            });
    
          
            if (deleteCount > 0) {
                res.json({
                    meta: {
                        status: 200,
                        message: 'Película eliminada exitosamente.',
                        url: 'api/movies/delete/:id'
                    },
                    data: null
                });
            } else {
                res.status(404).json({
                    meta: {
                        status: 404,
                        message: 'No se encontró la película para eliminar.',
                        url: 'api/movies/delete/:id'
                    },
                    data: null
                });
            }
        } catch (error) {
            console.error('Error al eliminar la película:', error);
            res.status(500).json({
                meta: {
                    status: 500,
                    url: 'api/movies/delete/:id'
                },
                message: 'Error interno del servidor',
                error: error.message
            });
        }
    }
    
}

module.exports = moviesAPIController;