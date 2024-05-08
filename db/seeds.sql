USE employee_db;

INSERT INTO department(name)
VALUES('Sales'),
      ('Engineering'),
      ('Finance'),
      ('Legal');



INSERT INTO role(title,department_id,salary)
VALUES('Sales Lead', 1, 110000),
('Sales Person', 1, 90000),
('Lead Engineer', 2, 150000),
('Software Engineer', 2, 120000),
('Account Manager', 3, 170000),
('Accountant', 3, 125000),
('Legal Team Lead', 4, 275000),
('Lawyer', 4, 200000);

INSERT INTO employee(first_name, last_name, role_id)
VALUES
('Tom','Browne', 1),
('Mike','Chan', 2),
('Paige','Cador', 3),
('Cole','Fanola', 4),
('Truce','Hamilton', 5),
('Soleil','Roberts', 6),
('Priscilla','Murphy', 7),
('Alexander','Wang', 8);



UPDATE employee set manager_id=1 where id=2;