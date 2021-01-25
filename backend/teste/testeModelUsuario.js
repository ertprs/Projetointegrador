const { sequelize, Usuario } = require('../models');

Usuario.findByPk(1).then(
    usuario => {
        console.log(usuario.toJSON());
        sequelize.close();
    }
)


Usuario.findByPk(7,{include:['evento','acesso']}).then(
    evento => {
        console.log(evento.toJSON());
        sequelize.close();
    }
)
