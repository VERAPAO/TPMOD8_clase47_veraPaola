const path = require('path');

const moviesHtmlFormularioController = {
    'form': (req, res) => {
        const filePath = path.join(process.cwd(), 'views/formulario.html');
        res.sendFile(filePath);
    }
};

module.exports = moviesHtmlFormularioController;
