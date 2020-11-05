
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Eventos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nomeEvento: {
        type: Sequelize.STRING
      },
      duracao: {
        type: Sequelize.INTEGER
      },
      exibicao: {
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.STRING
      },
      usuarios_id: {
        type: Sequelize.INTEGER,
        references: {
          model:"Usuarios",
          key:"id"
        }
      },
      timezone: {
        type: Sequelize.STRING
      },
  
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Eventos');
  }
};