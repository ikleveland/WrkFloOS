'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   let leads = [];

   for(let i = 0; i < 10; i++) {
    leads.push( {
       email: faker.internet.email(),
       firstName: faker.name.firstName(),
       lastName: faker.name.lastName(),
       phoneNumber: +14043878862,
       createdAt: new Date(),
        updatedAt: new Date(),
       userId: faker.datatype.number({ min: 1, max: 100 }),
     })
   }
   await queryInterface.bulkInsert('Leads', leads)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
