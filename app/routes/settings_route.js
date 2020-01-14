module.exports = function(app){

    var settings = require('../controllers/settings_controller.js')

    app.route('/preparedb')
        .get(settings.prepareDB)

}