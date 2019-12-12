module.exports = function(app){

    var employees = require('../controllers/employee_controller.js')

    app.route('/employees')
        .get(employees.getEmpoyees)
        .put(employees.addEmployee)
        .post(employees.updateEmployee)

    app.route('/dropdown')
        .get(employees.getDropdown)

    app.route('/leave_remaining')
        .post(employees.getNumLeaves)

    app.route('/leaves')
        .put(employees.saveLeaves)
        .post(employees.getLeaves)

    app.route('/deleteEmplyee')
        .post(employees.deleteEmployee)

    app.route('/deleteLeave')
        .post(employees.deleteLeave)

}