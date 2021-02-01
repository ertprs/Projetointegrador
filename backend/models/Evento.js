
module.exports = (sequelize, DataTypes) => {

    const evento = sequelize.define(
        'Evento',
        {
            nomeEvento: DataTypes.STRING,
            duracao: DataTypes.INTEGER,
            exibicao: DataTypes.INTEGER,
            url: DataTypes.STRING,
            timezone: DataTypes.STRING,
            descricao: DataTypes.STRING,
            usuarios_id: {
                type: DataTypes.INTEGER,
                foreignKey: true
            }

        }, {
        tableName: "eventos",
        timestamps: true
    }
    )
    evento.associate = (models) => {
        evento.belongsTo(models.Usuario, { as: "usuario", foreignKey: "usuarios_id" })
        evento.hasMany(models.Regra, { as: "regras", foreignKey: "eventos_id" })
        evento.belongsToMany(models.IntervaloDisponibilidade, { as: "evento_disponibilidade", through: "eventos_x_disponibilidade", foreignKey: "eventos_id", otherKey: "IntervaloDisponibilidade_id" })
    }

    return evento;

}

