const inquirer = require('inquirer')
const {printTable} = require('console-table-printer')
const mysql2 = require('mysql2')

const db = mysql2.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'employee_db',
    port:3306
})

db.connect( ()=>{
    menu()
})


function menu(){
    
}