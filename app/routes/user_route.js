module.exports = function(app){

    var user = require('../controllers/user_controller.js')

    app.route('/login')
        .post(user.login)

    app.route('/user')
        .post(user.getUsers)

}