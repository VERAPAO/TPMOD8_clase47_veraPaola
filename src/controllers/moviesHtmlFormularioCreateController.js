const path = require('path');

const moviesHtmlFormularioCreateController = {
    'formCreate': (req, res) => {
        const filePath = path.join(process.cwd(), 'views/formularioCrear.html');
        res.sendFile(filePath);
    }
};

module.exports = moviesHtmlFormularioCreateController;
