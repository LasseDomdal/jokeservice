require('should');
const controller = require("../controllers/controllers");

describe('controllers test - promise', function () {
    it('getEmployees() test', async () => {
        let employees = await controller.getEmployees();
        employees.length.should.be.greaterThanOrEqual(2);
        employees[0].name.should.be.equal('Viggo');
        employees[1].name.should.be.equal('Ida');
    });
});