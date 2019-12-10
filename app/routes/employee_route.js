module.exports = function(app){

    var employees = require('../controllers/employee_controller.js')

    app.route('/employees')
        .get(employees.getEmpoyees)
        .put(employees.addEmployee)
        .post(employees.updateEmployee)
    app.route('/dropdown')
        .get(employees.getDropdown)

}