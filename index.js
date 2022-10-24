const express = require('express')
const mysql = require('mysql')

// create connection 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'xyzabc',
    database:'nodemysql'
})

// connect to MySQL
db.connect(err => {
    if(err) {
        throw err
    }
    console.log('MySQL Connected')
})

const app = express()

// Create Database
app.get('/createdb',(req, res) => {
    let sql = 'CREATE DATABASE nodemysql'
    db.query(sql,err => {
        if(err) {
            throw err
        }
        res.send('Database Created')
    });
});

// create table
app.get('/createemployee', (req, res) => {
    let sql = 'CREATE TABLE employee (id int AUTO_INCREMENT, name VARCHAR(255), designation VARCHAR(255), PRIMARY KEY(id))'
    db.query(sql ,err => {
        if(err) {
            throw err
        }
        res.send('Employee table created')
    })
})
// insert employee
app.get('/employee1',(req, res) =>{
    let post={name:'jake smith',designation:'Chief Executive Officer'}
    let sql = 'INSERT INTO employee SET ?'
    let query = db.query(sql,post, err => {
        if(err) {
            throw err
        }
        res.send('Employee added')
    })
})

// select employees
app.get('/getemployee' , (req, res) => {
    let sql = 'SELECT * FROM employee'
    let query = db.query(sql, (err, results) => {
        if(err) {
            throw err
        }
        console.log(results)
        res.send('Employee details fetched')
    })
})
// update employee
app.get('/updateemployee/:id', (req, res) => {
    let newName = 'update name'
    let sql = 'update employee SET name ='${newName}' Where id = ${req.params.id}'
    let query = db.query( sql, err =>{
        if(err){
            throw err
        }
        res.send('Employee upadted')
    })

})

// delete employee
app.get('/deleteemployee/:id',(req,res) => {
    let sql ='DElETE FROM EMPLOYEE WHERE id =${req.params.id}'
    let query = db.query( sql, err =>{
        if(err){
            throw err
        }
        res.send('Employee deleted')
    })
})

app.listen('3000',() => {
    console.log('Server started on port 3000')
})