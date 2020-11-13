const { sequelize, DiaSemana } = require('../models');

DiaSemana.findByPk(1).then(
    diaSemana => {
        console.log(diaSemana.toJSON());
        sequelize.close();
    }
)
