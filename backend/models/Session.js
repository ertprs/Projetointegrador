const Evento = require("./Evento")

module.exports = (sequelize, Datatypes) =>{

    const session = sequelize.define(
        'Session',
        {
            usuario_id:{
                type: Datatypes.INTEGER,
                foreignKey: true
            }
        },{
            tableName:"session",
            timestamps:true
        }
    )
    session.associate = (models) =>{
        session.belongsTo(models.Usuario,{as:"usuario",foreignKey:"usuarios_id"})
    }

    return session;
}