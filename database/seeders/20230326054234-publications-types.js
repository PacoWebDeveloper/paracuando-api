'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('publications_types', [{
      id: 1,
      name: 'Concierto',
      description: 'Ideal para clasificar eventos musicales',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id:2,
      name: 'Ropa',
      description: 'Ideal para clasificar lugares donde se exiva ropa',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('publications_types', null, {});
  }
};
