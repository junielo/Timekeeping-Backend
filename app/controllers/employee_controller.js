var conn = require('../config/db.js');

var Employee = {

    getEmpoyees: function(req, res){
        let sql = "select employees.id, concat(fname, ' ', lname) as name, positions.name as position, employee_status.name as status, date_employed from employees " +
        "join positions on positions.id = position_id " +
        "join employee_status on employee_status.id = status_id"

        conn.query(sql, function(err, result){
            if(!err){
                if(result.length != 0){

                    let arrQuery = []
                    for(let arrs of result){
                        arrQuery.push(new Promise(function(resolve, reject){
                            sql = "select department_group.id as id, department.id as dept_id, department.name as name, department.description as description from department_group " +
                            "join department on department.id = dept_id where emp_id = '" + arrs.id + "'"
                            conn.query(sql, function(arr, results){
                                if(!err)
                                    resolve({
                                        id: arrs.id,
                                        name: arrs.name,
                                        position: arrs.position,
                                        status: arrs.status,
                                        depts: results
                                    })
                                else reject(err)
                            })
                        }))
                    }
                    Promise.all(arrQuery).then(function(result){
                        res.status(200).json({
                            success: true,
                            employee: result
                        });
                    }, function(err){
                        res.status(400).json({
                            success: false,
                            response: err
                        });
                    })

                }
                else
                    res.status(200).json({
                        success: false,
                        response: "No employee yet"
                    });
            }else{
                res.status(400).json({
                    success: false,
                    response: "Sql Error"
                });
            }
        })
    },

}

module.exports = Employee