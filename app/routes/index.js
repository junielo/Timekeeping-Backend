const employeesRoutes = require('./employee_route.js')

module.exports = function(app){
    employeesRoutes(app)
}