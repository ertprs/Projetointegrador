
module.exports = (sequelize, DataTypes) => {

    const pergunta = sequelize.define(
        'Pergunta',
        {
            pergunta: DataTypes.STRING,
            eventos_id:{
                type:DataTypes.INTEGER,
                foreignKey:true
            }
            
        },{
            tableName:"perguntas",
            timestamps:true
        }
    )
    pergunta.associate = (models) =>{
        pergunta.belongsTo(models.Evento,{as:"pergunta_evento",foreignKey:"eventos_id"}) 
    // usuario.hasMany(models.Post,{as:"posts",foreignKey:"usuarios_id"})
   // pergunta.belongsToMany(models.Agendamento, {as:'pergunta_agendamento',through:"respostas",foreignKey:"agendamento_id",otherKey:"perguntas_id"})
  }
  
    return pergunta;
    
  }