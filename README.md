# Employee Tracker

![theCODEbarbie Badge](https://img.shields.io/badge/theCODEbarbie-%23FBF6E9?style=for-the-badge&logo=Spotlight&labelColor=%23F79AD3)

## Description

Employee Tracker is a command-line application built using Node.js, Inquirer, and Sequelize with MySQL. It allows business owners to easily view and manage their company's departments, roles, and employees. With features like viewing, adding, and updating departments, roles, and employees, as well as the ability to update employee roles, this application provides a comprehensive solution for organizing and planning business operations.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Database Schema](#database-schema)
- [Walkthrough Video](#walkthrough-video)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install Employee Tracker, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies, including Sequelize and MySQL2.
4. Set up your MySQL database and credentials. Make sure to update the database connection details in the Sequelize configuration file (`config/config.json`) accordingly.

## Usage

To use Employee Tracker, follow these steps:

1. Ensure that your MySQL database is running.
2. Navigate to the project directory in your terminal.
3. Run `node index.js` to start the application.
4. Follow the on-screen prompts to interact with the application and manage your company's data.

## Database Schema

Employee Tracker follows the following database schema:

### `department`

- `id`: `INTEGER PRIMARY KEY AUTO_INCREMENT`
- `name`: `VARCHAR(30) UNIQUE NOT NULL` to hold department name

### `role`

- `id`: `INTEGER PRIMARY KEY AUTO_INCREMENT`
- `title`: `VARCHAR(30) UNIQUE NOT NULL` to hold role title
- `salary`: `DECIMAL NOT NULL` to hold role salary
- `department_id`: `INTEGER NOT NULL` to hold reference to department role belongs to

### `employee`

- `id`: `INTEGER PRIMARY KEY AUTO_INCREMENT`
- `first_name`: `VARCHAR(30) NOT NULL` to hold employee first name
- `last_name`: `VARCHAR(30) NOT NULL` to hold employee last name
- `role_id`: `INTEGER NOT NULL` to hold reference to employee role
- `manager_id`: `INTEGER` to hold reference to another employee that is the manager of the current employee (`null` if the employee has no manager)

## Walkthrough Video

A walkthrough video demonstrating the functionality of Employee Tracker can be found [here](#) (insert link to your video).

## Contributing

Contributions to Employee Tracker are welcome! Please refer to the [contributing guidelines](CONTRIBUTING.md) for more information.

## License

Employee Tracker is licensed under the [MIT License](LICENSE).
