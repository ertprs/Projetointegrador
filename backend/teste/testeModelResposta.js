const { sequelize, Resposta } = require('../models');



Resposta.findAll().then(
    data => {
        console.log(data.map( u => u.toJSON()));
        sequelize.close();
    }
)