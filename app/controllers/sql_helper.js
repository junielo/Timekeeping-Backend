var conn = require('../config/db.js');

let Helper = {

    insert: function(table, rawCols){
        return new Promise(function(resolve, reject){
            let sql = "insert into " + table + " set" + makeSqlField(rawCols) + " created_datetime=NOW()"
            conn.query(sql, function(err, results){
                if(!err){
                    resolve(results)
                }else{
                    reject(err)
                }
            })
        })
    },
    update: function(id, table, rawCols){
        delete rawCols.id
        return new Promise(function(resolve, reject){
            let sql = "update " + table + " set" + makeSqlField(rawCols) + " updated_datetime=NOW() where id like " + id
            conn.query(sql, function(err, results){
                if(!err){
                    resolve(results)
                }else{
                    reject(err)
                }
            })
        })
    },
    delete: function(id, table){
        return new Promise(function(resolve, reject){
            let sql = "update " + table + " set deleted_datetime=NOW() where id like " + id
            conn.query(sql, function(err, results){
                if(!err){
                    resolve(results)
                }else{
                    reject(err)
                }
            })
        })
    }

}

var makeSqlField = function(rawCols){
    let field = ""
    for(let key in rawCols){
        if (rawCols[key] != null && rawCols[key] !== 'null' && rawCols[key] !== 'undefined') {
            field += " " + key.toUpperCase() + "='" + rawCols[key] + "',";
        }
    }
    return field
}

module.exports = Helper