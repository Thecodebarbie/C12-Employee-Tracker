USE employeecentral_db;
INSERT INTO department(name)
VALUES('Sales'),
        ('Engineering');

INSERT INTO role(title,department_id,salary)
VALUES('Sales Lead', 1),
('Sales Person', 1),
('Lead Engineering', 2);