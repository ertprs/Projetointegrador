
module.exports = (sequelize, DataTypes) => {

    const evento = sequelize.define(
        'Evento',
        {
            nomeEvento: DataTypes.STRING,
            duracao: DataTypes.INTEGER,
            exibicao: DataTypes.INTEGER,
            url: DataTypes.STRING,                   
            timezone: DataTypes.STRING,
            usuarios_id:{
            type:DataTypes.INTEGER,
            descricao:DataTypes.STRING,
            foreignKey:true
            }

        },{
            tableName:"eventos",
            timestamps:true
        }
    )
    evento.associate = (models) =>{ 
        evento.belongsTo(models.Usuario,{as:"usuario",foreignKey:"usuarios_id"})
        evento.hasMany(models.Regra,{as:"regras", foreignKey:"eventos_id"})
        evento.belongsToMany(models.IntervaloDisponibilidade, {as:"evento_disponibilidade", through:"eventos_x_disponibilidade", foreignKey:"eventos_id", otherKey:"IntervaloDisponibilidade_id"}) 
  }
  
    return evento;
    
  }

  // usuario.hasMany(models.Post,{as:"posts",foreignKey:"usuarios_id"})
    // usuario.belongsToMany(models.Post, {as:'usuariocurtiu',through:"curtidas",foreignKey:"usuarios_id",otherKey:"posts_id"})
  