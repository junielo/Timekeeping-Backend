var conn = require('../config/db.js');

var User = {
    login: function(req, res){
        let sql = "select * from user_master where usernname like '" + req.body.username + "' and password like '" + req.body.password + "'"
        conn.query(sql, function(err, result){
            if(!err){
                res.status(200).json({
                    success: true,
                    response: result[0]
                })
            }else{
                res.status(200).json({
                    success: false,
                    response: "Error logging in"
                });
            }
        })
    }
}
module.exports = User