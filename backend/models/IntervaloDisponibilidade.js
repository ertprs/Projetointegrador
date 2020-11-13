module.exports = (sequelize, DataTypes) => {

    const intervaloDisponibilidade = sequelize.define(
        'IntervaloDisponibilidade',
        {
            inicio: DataTypes.STRING,
            fim: DataTypes.STRING,                   
            DiaSemana_id:{
                type:DataTypes.INTEGER,
                foreignKey:true
            }

        },{
            tableName:"IntervaloDisponibilidade",
            timestamps:true
        }
    )
    evento.associate = (models) =>{ 
        evento.belongsTo(models.DiaSemana,{as:"IntervaloDisponibilidade",foreignKey:"DiaSemana_id"}) 
    }

    return intervaloDisponibilidade;

    }

  // usuario.hasMany(models.Post,{as:"posts",foreignKey:"usuarios_id"})
    // usuario.belongsToMany(models.Post, {as:'usuariocurtiu',through:"curtidas",foreignKey:"usuarios_id",otherKey:"posts_id"})
