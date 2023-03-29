'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkInsert('cities', [{
        id: 1,
        state_id: 1,
        name: 'Celaya',
        created_at: new Date(),
        updated_at: new Date()
      }, {
        id: 2,
        state_id: 1,
        name: 'Cortazar',
        created_at: new Date(),
        updated_at: new Date()
      }, {
        id: 3,
        state_id: 1,
        name: 'San Miguel de allende',
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
    const transaction = queryInterface.sequelize.transaction()
    await queryInterface.bulkDelete('cities', null, {});
  }
};
