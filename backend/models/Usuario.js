
module.exports = (sequelize, DataTypes) => {

  const usuario = sequelize.define(
      'Usuario',
      {
          nome: DataTypes.STRING,
          email: DataTypes.STRING,
          sub: DataTypes.STRING,
          logo: DataTypes.STRING,
          url: DataTypes.STRING,
          premium: DataTypes.STRING,
          timezone: DataTypes.STRING,
          nomedeexibicao: DataTypes.STRING,

      },{
          tableName:"usuarios",
          timestamps:false
      }
  )
usuario.associate = (models) =>{
  usuario.hasMany(models.Evento,{as:"evento",foreignKey:"usuarios_id"}) 
  // usuario.hasMany(models.Post,{as:"posts",foreignKey:"usuarios_id"})
  // usuario.belongsToMany(models.Post, {as:'usuariocurtiu',through:"curtidas",foreignKey:"usuarios_id",otherKey:"posts_id"})
}

  return usuario;
  
}