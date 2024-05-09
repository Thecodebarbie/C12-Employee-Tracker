const inquirer = require('inquirer')
const { printTable } = require('console-table-printer')
const mysql2 = require('mysql2')

const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_db',
    port: 3306
})

db.connect(() => {
    menu()
})


function menu() {
    // view all deparrtments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'option',
            choices: ['view all deparrtments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
        }
    ])
        .then(response => {
            if (response.option === 'view all employees') {
                viewAllEmployees()
            }
        })
}
function viewAllEmployees(){
    db.query(`SELECT employee.id as id, employee.first_name, employee.last_name, title, 
    name as department, salary,
    CONCAT(managerTable.first_name, ' ', managerTable.last_name) as manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
   LEFT JOIN department ON role.department_id=department.id
   LEFT JOIN employee as managerTable 
   ON employee.manager_id=managerTable.id;`, (err,data)=>{


     printTable(data)
     menu()
   })
}