'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tags', [{
      id: 1,
      name: 'Tag 1',
      description: 'Preguntar que hay que ponerle',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {await queryInterface.bulkDelete('tags', null, {});
  }
};
