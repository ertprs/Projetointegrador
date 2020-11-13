
module.exports = (sequelize, DataTypes) => {

    const regra = sequelize.define(
        'Regra',
        {
            nomeDaRegra: DataTypes.STRING,
            valor: DataTypes.INTEGER,
            status: DataTypes.BOOLEAN,
            eventos_id:{
                type:DataTypes.INTEGER,
                foreignKey: true
            }
        },{
            tableName: "regras",
            timestamps:true
        }
    )
    regra.associate = (models) =>{
        regra.belongsTo(models.Evento,{as:"eventos", foreignKey:"eventos_id"})
    }

    return regra;
}