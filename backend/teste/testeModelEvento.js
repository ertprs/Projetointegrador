const { sequelize, Evento } = require('../models');

Evento.findByPk(1).then(
    evento => {
        console.log(evento.toJSON());
        sequelize.close();
    }
)

