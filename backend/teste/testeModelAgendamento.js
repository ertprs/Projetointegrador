const { sequelize, Agendamento } = require('../models');

Agendamento.findByPk(1,{include:['agendamentos_evento',"agendamento_pergunta"]}).then(
    agendamento => {
        console.log(agendamento.toJSON());
        sequelize.close();
    }
)

