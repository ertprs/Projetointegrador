const { sequelize, Session } = require('../models');

Session.findByPk(1).then(
    session => {
        console.log(session.toJSON());
        sequelize.close();
    }
)