module.exports = (sequelize, DataTypes) => {

    const diaSemana = sequelize.define(
        'DiaSemana',
        {
            nome: DataTypes.STRING,
        },{
            tableName:"diasemana",
            timestamps:true
        }
    )
    diaSemana.associate = (models) =>{ 
        diaSemana.hasMany(models.IntervaloDisponibilidade,{as:"intervaloDisponibilidade",foreignKey:"DiaSemana_id"}) 
    }
    return diaSemana;

    } 