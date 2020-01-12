var conn = require('../config/db.js');
var Helper = require('./sql_helper.js')

var Employee = {

    getEmployees: function(req, res){
        let search = req.query.search != undefined ? " where concat(fname, lname) like replace('%" + req.query.search + "%', ' ', '')" : ''
        let byID = req.query.id != undefined ? " where employees.id like " + req.query.id : ''
        let sql = "select employees.id, concat(fname, ' ', lname) as name, fname, mname, lname, email, birthdate, number, sick_num, vacation_num, positions.id as pos_id, positions.name as position, employee_status.id as stat_id, employee_status.name as status, date_employed from employees " +
        "join positions on positions.id = position_id " +
        "join employee_status on employee_status.id = status_id" + search + byID
        console.log(sql)
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
                                        fname: arrs.fname,
                                        mname: arrs.mname,
                                        lname: arrs.lname,
                                        email: arrs.email,
                                        birthdate: arrs.birthdate,
                                        number: arrs.number,
                                        sick_num: arrs.sick_num,
                                        vacation_num: arrs.vacation_num,
                                        pos_id: arrs.pos_id,
                                        position: arrs.position,
                                        stat_id: arrs.stat_id,
                                        status: arrs.status,
                                        date_employed: arrs.date_employed,
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

                }else
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
    getDropdown: function(req, res){
        let body = []
        let arrQuery = []

        arrQuery.push(new Promise(function(resolve, reject){
            let sql = "select id, name, description from positions"
            conn.query(sql, function(err, result){
                if(!err){
                    if(result.length != 0){
                        resolve(result)
                    }else
                        reject({position: err})
                }else{
                    reject({position: err})
                }
            })
        }))
        arrQuery.push(new Promise(function(resolve, reject){
            let sql = "select id, name, description from department"
            conn.query(sql, function(err, result){
                if(!err){
                    if(result.length != 0){
                        resolve(result)
                    }else
                        reject({department: err})
                }else{
                    reject({department: err})
                }
            })
        }))
        arrQuery.push(new Promise(function(resolve, reject){
            let sql = "select id, name, description from employee_status"
            conn.query(sql, function(err, result){
                if(!err){
                    if(result.length != 0){
                        resolve(result)
                    }else
                        reject({employee_status: err})
                }else{
                    reject({employee_status: err})
                }
            })
        }))
        Promise.all(arrQuery).then(function(result){
            res.status(200).json({
                success: true,
                position: result[0],
                department: result[1],
                employee_status: result[2]
            });
        }, function(err){
            res.status(400).json({
                success: false,
                response: err
            });
        })
    },
    addEmployee: function(req, res){
        let depts = req.body.department
        delete req.body.department
        let initHelper = Helper.insert('employees', req.body)
        initHelper.then(function(result){
            let vals = []
            let sql = "insert into department_group (emp_id, dept_id) values ?"
            for(let dept of depts) vals.push([result.insertId, dept])
            conn.query(sql, [vals], function(err, result){
                if(!err){
                    res.status(200).json({
                        success: true,
                        response: "Employee successfully added"
                    })
                }else{
                    res.status(200).json({
                        success: false,
                        response: "Error saving department_group"
                    });
                }
            })
        })
    },
    updateEmployee: function(req, res){
        let depts = req.body.department
        delete req.body.department
        let id = req.body.id
        let initHelper = Helper.update(req.body.id, 'employees', req.body)
        initHelper.then(function(result){
            let sql = "delete from department_group where emp_id like " + id
            conn.query(sql, function(err, result){
                if(!err){
                    let vals = []
                    let sql = "insert into department_group (emp_id, dept_id) values ?"
                    for(let dept of depts) vals.push([id, dept])
                    conn.query(sql, [vals], function(err, result){
                        if(!err){
                            res.status(200).json({
                                success: true,
                                response: "Employee successfully added"
                            })
                        }else{
                            res.status(200).json({
                                success: false,
                                response: "Error saving department_group"
                            });
                        }
                    })
                }else{
                    res.status(200).json({
                        success: false,
                        response: "Error deleting department_group"
                    });
                }
            })
        })
    },
    deleteEmployee: function(req, res){
        console.log(req.body)
        let initHelper = Helper.delete(req.body.id, 'employees')
        initHelper.then(function(result){
            res.status(200).json({
                success: true,
                response: "Employee successfully deleted"
            })
        })
    },
    getNumLeaves: function(req, res){
        let sql = "select " + req.body.type + "_num as num from employees where id like " + req.body.id
        console.log(sql)
        conn.query(sql, function(err, result){
            if(!err){
                sql = "select count(id) as used from leaves where year(sched_date) like year(now()) and leave_type like '" + req.body.type + "' and emp_id like " + req.body.id
                conn.query(sql, function(err, result2){
                    if(!err){
                        res.status(200).json({
                            success: true,
                            remaining: +result[0].num - +result2[0].used
                        });
                    }else{
                        res.status(200).json({
                            success: false,
                            response: "Error fetching leaves"
                        });
                    }
                })
            }else{
                res.status(200).json({
                    success: false,
                    response: "Error fetching employees"
                });
            }
        })
    },
    saveLeaves: function(req, res){
        let vals = []
        let sql = "insert into leaves (emp_id, leave_type, reason, sched_date) values ?"
        for(let data of req.body) vals.push([data.id, data.type, data.reason, data.date])
        conn.query(sql, [vals], function(err, result){
            if(!err){
                res.status(200).json({
                    success: true,
                    response: "Leaves successfully added"
                })
            }else{
                res.status(200).json({
                    success: false,
                    response: "Error saving leaves"
                });
            }
        })
    },
    getLeaves: function(req, res){
        let mStat = ""
        if(req.body.stat === 'pendinng'){
            mStat = ' and approved_by is null and cancelled_by is null'
        }else if(req.body.stat === 'approved'){
            mStat = ' and approved_by is not null'
        }else if(req.body.stat === 'cancelled'){
            mStat = ' and cancelled_by is not null'
        }
        let sql = "select * from leaves where emp_id like " + req.body.id + " and leave_type like '" + req.body.type + "' and year(sched_date) = '" + req.body.year + "'" + mStat
        console.log(sql)
        conn.query(sql, function(err, result){
            if(!err){
                res.status(200).json({
                    success: true,
                    response: result
                })
            }else{
                res.status(200).json({
                    success: false,
                    response: "Error saving leaves"
                });
            }
        })
    },
    deleteLeave: function(req, res){
        let initHelper = Helper.delete(req.body.id, 'leaves')
        initHelper.then(function(result){
            res.status(200).json({
                success: true,
                response: "Leave successfully deleted"
            })
        })
    },
    addNumLeave: function(req, res){
        let sql = "update employees set " + req.body.type + "_num = " + req.body.type + "_num + " + req.body.qty + " where id like " + req.body.id
        conn.query(sql, function(err, result){
            if(!err){
                res.status(200).json({
                    success: true,
                    response: result
                })
            }else{
                res.status(200).json({
                    success: false,
                    response: "Error editing leaves"
                });
            }
        })
    },
    getYearSummary: function(req, res){
        let id = req.body.id
        let type = req.body.type
        let sql = "select year(sched_date) as years from leaves where emp_id like " + id + " and leave_type like '" + type + "' group by year(sched_date) order by year(sched_date) desc"
        conn.query(sql, function(err, result){
            if(!err){
                res.status(200).json({
                    success: true,
                    response: result
                })
            }else{
                res.status(200).json({
                    success: false,
                    response: "Error editing leaves"
                });
            }
        })
    }

}

module.exports = Employee