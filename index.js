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
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
        }
    ])
        .then(response => {
            if (response.option === 'view all employees') {
                viewAllEmployees()
            }
            else if (response.option === 'view all roles') {// condition for viewing all roles
                viewAllRoles()
            }
            else if (response.option === 'view all departments') { // condition for viewing all departments
                viewAllDepartments();
            }
            else if(response.option === 'add an employee'){
                addEmployee()
            }
            else if(response.option === 'add a role'){
                addRoles()
            }
            else if(response.option === 'add a department'){
                addDepartment()
            }
            else if(response.option === 'update an employee role'){
                updateEmployeeRole()
            }
        })
}
function viewAllDepartments() {
    db.query(`SELECT * FROM department;`, (err, data) => {
        if (err) {
            console.error('Error retrieving departments:', err);
            menu(); // Return to menu in case of error
        } else {
            printTable(data); // Print departments data in a formatted table
            menu(); // Return to menu
        }
    });
}

function addEmployee() {
    let roleData; // Define roleData outside the promise chain to make it accessible in the entire function
    db.promise().query(`SELECT id as value, title as name from role`)
        .then(([roleResult, _]) => {
            roleData = roleResult; // Assign roleResult to roleData
            return db.promise().query(`SELECT id as value, CONCAT(first_name, ' ', last_name) as name from employee where manager_id is null`);
        })
        .then(([employeeData, _]) => {
            // Prompt user for employee details
            return inquirer.prompt([
                {
                    type: 'input',
                    message: 'What is your first name?',
                    name: 'first_name'
                },
                {
                    type: 'input',
                    message: 'What is your last name?',
                    name: 'last_name'
                },
                {
                    type: 'list',
                    message: 'What is your title?',
                    name: 'title',
                    choices: roleData // Use roleData here
                },
                {
                    type: 'list',
                    message: 'Who is your manager?',
                    name: 'manager_id',
                    choices: employeeData //
                }
            ]);
        })
        .then(response => {
            // Insert employee data into the database
            return db.promise().query(`insert into employee(first_name,last_name,role_id,manager_id) values (?, ?, ?, ?)`, [response.first_name, response.last_name, response.title, response.manager_id]);
        })
        .then(() => {
            // After inserting employee, view all employees
            return viewAllEmployees();
        })
        .catch(err => {
            // Handle errors
            console.error('Error adding employee:', err);
            menu();
        });
}

function addRoles() {
    let departmentData; // Define roleData outside the promise chain to make it accessible in the entire function
    db.promise().query(`SELECT id as value, name as name from department`)
        .then(([deptResult, _]) => {
            departmentData = deptResult; // Assign roleResult to roleData
        
            // Prompt user for employee details
            return inquirer.prompt([
                {
                    type: 'input',
                    message: 'What is the title of your role?',
                    name: 'title'
                },
                {
                    type: 'input',
                    message: 'What is your salary?',
                    name: 'salary'
                },
                {
                    type: 'list',
                    message: 'What is your department?',
                    name: 'department',
                    choices: departmentData // Use roleData here
                },
            ]);
        })
        .then(response => {
            // Insert employee data into the database
            return db.promise().query(`insert into role(title,salary,department_id) values (?, ?, ?)`, [response.title, response.salary, response.department]);
        })
        .then(() => {
            // After inserting employee, view all employees
            return viewAllRoles();
        })
        .catch(err => {
            // Handle errors
            console.error('Error adding employee:', err);
            menu();
        });
}

function addDepartment() {
            // Prompt user for employee details
            return inquirer.prompt([
                {
                    type: 'input',
                    message: 'What is the name of your department?',
                    name: 'name'
                }
            ])
        .then(response => {
            // Insert employee data into the database
            return db.promise().query(`insert into department(name) values (?)`, [response.name]);
        })
        .then(() => {
            // After inserting employee, view all employees
            return viewAllDepartments();
        })
        .catch(err => {
            // Handle errors
            console.error('Error adding employee:', err);
            menu();
        });
}

function viewAllRoles(){
    db.query(`SELECT role.id as id, title, name as department, salary
    FROM role
    LEFT JOIN department 
    ON role.department_id=department.id;`, (err,data)=>{
         printTable(data)
         menu()
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

function updateEmployeeRole() {
    let roleData; // Define roleData outside the promise chain to make it accessible in the entire function
    db.promise().query(`SELECT id as value, title as name from role`)
        .then(([roleResult, _]) => {
            roleData = roleResult; // Assign roleResult to roleData
            return db.promise().query(`SELECT id as value, CONCAT(first_name, ' ', last_name) as name from employee`);
        })
        .then(([employeeData, _]) => {
            // Prompt user for employee details
            return inquirer.prompt([
                
                {
                    type: 'list',
                    message: 'Select employee to update:',
                    name: 'employee_id',
                    choices: employeeData //
                },
                {
                    type: 'list',
                    message: 'What is the new role?',
                    name: 'title',
                    choices: roleData // Use roleData here
                }
            ]);
        })
        .then(response => {
            // Insert employee data into the database
            return db.promise().query(`update employee SET role_id = "?" where id = "?"`, [response.title, response.employee_id]);
        })
        .then(() => {
            // After inserting employee, view all employees
            return viewAllEmployees();
        })
        .catch(err => {
            // Handle errors
            console.error('Error adding employee:', err);
            menu();
        });
}