
module.exports = (sequelize, DataTypes) => {

    const agendamento = sequelize.define(
        'Agendamento',
        {
            horarioAgendadoInicio: DataTypes.STRING,
            horaioAgendadoFim: DataTypes.STRING,
            googleID: DataTypes.INTEGER,
            clienteNome: DataTypes.STRING,
            clienteEmail: DataTypes.STRING,
            clienteTelefone: DataTypes.STRING,
            eventos_id:{
                type:DataTypes.INTEGER,
                foreignKey:true
            }
            
        },{
            tableName:"agendamento",
            timestamps:true
        }
    )
    agendamento.associate = (models) =>{
        agendamento.belongsTo(models.Evento,{as:"agendamentos_evento",foreignKey:"eventos_id"}) 
        //agendamento.belongsToMany(models.Pergunta, {as:'agendamento_pergunta',through:"respostas",foreignKey:"pergunta_id",otherKey:"perguntas_id"})

    // usuario.hasMany(models.Post,{as:"posts",foreignKey:"usuarios_id"})
    // usuario.belongsToMany(models.Post, {as:'usuariocurtiu',through:"curtidas",foreignKey:"usuarios_id",otherKey:"posts_id"})
  }
  
    return agendamento;
    
  }