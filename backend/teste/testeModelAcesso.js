const { sequelize, Acesso } = require('../models');

Acesso.findByPk(1).then(
    acesso => {
        console.log(acesso.toJSON());
        sequelize.close();
    }
)
