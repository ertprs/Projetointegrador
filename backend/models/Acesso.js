
module.exports = (sequelize, DataTypes) => {

    const acesso = sequelize.define(
        'Acesso',
        {
            accessToken: DataTypes.STRING,
            refreshToken: DataTypes.STRING,
            usuarios_id: {
                type: DataTypes.INTEGER,
                foreignKey: true
            }

        }, {
        tableName: "acessos",
        timestamps: true
    }
    )
    acesso.associate = (models) => {
        acesso.belongsTo(models.Usuario, { as: "usuario", foreignKey: "usuarios_id" })
    }

    return acesso;
}