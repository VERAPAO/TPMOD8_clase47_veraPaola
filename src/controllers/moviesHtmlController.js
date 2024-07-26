const path = require('path');
//const db = require('../../database/models');
//const sequelize = db.sequelize;
//const { Op } = require("sequelize");
//const moment = require('moment');

const moviesHtmlController = {
    'home': (req, res) => {
        const filePath = path.join(process.cwd(), 'views/home.html'); // Ajusta la ruta según la ubicación real de tu archivo home.html

        // Renderiza el archivo HTML
        res.sendFile(filePath);
    }
}

module.exports = moviesHtmlController;