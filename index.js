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
    // view all deparrtments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

inquirer.prompt([
    {
        type:'list',
        message:'What would you like to do?',
        name:'option',
        choices:[ 'view all deparrtments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
    }
])

}