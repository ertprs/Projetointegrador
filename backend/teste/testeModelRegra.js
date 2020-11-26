const { sequelize, Regra } = require('../models');



Regra.findByPk(1).then(
    regra => {
        console.log(regra.toJSON());
        sequelize.close();
    }
)