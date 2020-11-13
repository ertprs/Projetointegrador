const { sequelize, Agendamento } = require('../models');

Agendamento.findByPk(1,{include:['agendamentos_evento']}).then(
    agendamento => {
        console.log(agendamento.toJSON());
        sequelize.close();
    }
)

