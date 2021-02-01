module.exports = (sequelize, DataTypes) => {

    const intervaloDisponibilidade = sequelize.define(
        'IntervaloDisponibilidade',
        {
            inicio: DataTypes.STRING,
            fim: DataTypes.STRING,
            DiaSemana_id: {
                type: DataTypes.INTEGER,
                foreignKey: true
            }
        }, {
        tableName: "IntervaloDisponibilidade",
        timestamps: true
    })
    intervaloDisponibilidade.associate = (models) => {
        intervaloDisponibilidade.belongsTo(models.DiaSemana, { as: "IntervaloDisponibilidade", foreignKey: "DiaSemana_id" })
    }
    return intervaloDisponibilidade;
}

