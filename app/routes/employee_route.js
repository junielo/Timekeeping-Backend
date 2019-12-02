module.exports = function(app){

    var employees = require('../controllers/employee_controller.js')

    app.route('/employees')
        .get(employees.getEmpoyees)

}