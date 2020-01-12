const employeesRoutes = require('./employee_route.js')
const UserRoutes = require('./user_route.js')

module.exports = function(app){
    employeesRoutes(app)
    UserRoutes(app)
}