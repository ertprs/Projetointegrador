const { sequelize, IntervaloDisponibilidade } = require('../models');

IntervaloDisponibilidade.findByPk(1).then(
    disponivel => {
        console.log(disponivel.toJSON());
        sequelize.close();
    }
)
