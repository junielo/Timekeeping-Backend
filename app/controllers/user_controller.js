var conn = require('../config/db.js');

var User = {
    login: function(req, res){
        let sql = "select * from user_master where usernname like '" + req.body.username + "' and password like '" + req.body.password + "'"
        conn.query(sql, function(err, result){
            if(!err){
                if(result.length != 0){
                    res.status(200).json({
                        success: true,
                        response: result[0]
                    })
                }else{
                    res.status(200).json({
                        success: false,
                        response: "No user found"
                    })
                }
            }else{
                res.status(200).json({
                    success: false,
                    response: "Error logging in"
                });
            }
        })
    },
    getUsers: function(req, res){
        let sql = "select user_master.id, concat(employees.fname, ' ', employees.lname) as name, user_master.user_type from user_master "+
            "join employees on user_master.emp_id = employees.id where user_master.emp_id != 0 and user_master.emp_id != " + req.body.id

        conn.query(sql, function(err, result){
            if(!err){
                if(result.length != 0){
                    res.status(200).json({
                        success: true,
                        response: result
                    })
                }else{
                    res.status(200).json({
                        success: false,
                        response: "No user found"
                    })
                }
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