const { sequelize, Pergunta } = require('../models');

Pergunta.findByPk(1,{include:['pergunta_evento','pergunta_agendamento']}).then(
    evento => {
        console.log(evento.toJSON());
        sequelize.close();
    }
)

