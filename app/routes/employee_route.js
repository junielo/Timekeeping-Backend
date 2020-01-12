module.exports = function(app){

    var employees = require('../controllers/employee_controller.js')

    app.route('/employees')
        .get(employees.getEmployees)
        .put(employees.addEmployee)
        .post(employees.updateEmployee)

    app.route('/dropdown')
        .get(employees.getDropdown)

    app.route('/leave_remaining')
        .post(employees.getNumLeaves)

    app.route('/leaves')
        .put(employees.saveLeaves)
        .post(employees.getLeaves)

    app.route('/deleteEmployee')
        .post(employees.deleteEmployee)

    app.route('/deleteLeave')
        .post(employees.deleteLeave)

    app.route('/addNumLeave')
        .post(employees.addNumLeave)

    app.route('/getLeavesByYear')
        .post(employees.getYearSummary)

}