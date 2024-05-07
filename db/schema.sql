DROP DATABASE IF EXISTS employeecentral_db;
CREATE DATABASE employeecentral_db;


CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name varchar(30) INT NOT NULL
);


CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2)
  department_id INT
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);

