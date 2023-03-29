'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkInsert('states', [{
        id: 1,
        country_id: 1,
        name: 'Guanajuato',
        created_at: new Date(),
        updated_at: new Date()
      }, {
        id: 2,
        country_id: 1,
        name: 'Queretaro',
        created_at: new Date(),
        updated_at: new Date()
      }, {
        id: 3,
        country_id: 1,
        name: 'Mexico',
        created_at: new Date(),
        updated_at: new Date()
      }], { transaction })

      await transaction.commit()
    
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('states', null, {});
  }
};
