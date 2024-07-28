const path = require('path');

const moviesHtmlFavoritasController = {
    'favorites': (req, res) => {
        const filePath = path.join(process.cwd(), 'views/favoritas.html');
        res.sendFile(filePath);
    }
};

module.exports = moviesHtmlFavoritasController;