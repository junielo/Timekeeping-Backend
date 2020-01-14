var conn = require('../config/db.js');

var Settings = {

    prepareDB: function(req, res){
        let sql = "ALTER TABLE user_master "+
            "ADD COLUMN `created_datetime` DATETIME NULL DEFAULT CURRENT_TIMESTAMP AFTER `password`, "+
            "ADD COLUMN `updated_datetime` DATETIME NULL AFTER `created_datetime`, "+
            "ADD COLUMN `deleted_datetime` DATETIME NULL AFTER `updated_datetime`, "+
            "CHANGE COLUMN `user_type` `user_type` VARCHAR(45) NULL DEFAULT NULL ;"
        conn.query(sql, function(err, result){
            res.status(200).json({
                success: true,
                response: "Done"
            })
        })  
    }

}
module.exports = Settings