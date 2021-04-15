const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const employees = [];

function init() {
    startHtml();
    addEmployee();
}

function addEmployee() {
    inquirer
        .prompt([{
                message: "What is the employee's name?",
                name: "name"
            },
            {
                type: "list",
                message: "What is their role?",
                choices: [
                    "Engineer",
                    "Intern",
                    "Manager"
                ],
                name: "role"
            },
            {
                message: "Enter employee ID number.",
                name: "id"
            },
            {
                message: "What is the employee's email address?",
                name: "email"
            }
        ])
        .then(function ({
            name,
            role,
            id,
            email
        }) {
            let roleInfo = "";
            if (role === "Engineer") {
                roleInfo = "GitHub username";
            } else if (role === "Intern") {
                roleInfo = "school name";
            } else {
                roleInfo = "office phone number";
            }
            inquirer.prompt([{
                        message: `Please enter employee's ${roleInfo}.`,
                        name: "roleInfo"
                    },
                    {
                        type: "list",
                        message: "Would you like to add more team members?",
                        choices: [
                            "yes",
                            "no"
                        ],
                        name: "moreMembers"
                    }
                ])
                .then(function ({
                    roleInfo,
                    moreMembers
                }) {
                    let newMember;
                    if (role === "Engineer") {
                        newMember = new Engineer(name, id, email, roleInfo);
                    } else if (role === "Intern") {
                        newMember = new Intern(name, id, email, roleInfo);
                    } else {
                        newMember = new Manager(name, id, email, roleInfo);
                    }
                    employees.push(newMember);
                    addHtml(newMember)
                        .then(function () {
                            if (moreMembers === "yes") {
                                addEmployee();
                            } else {
                                finishHtml();
                            }
                        });

                });
        });
}

function startHtml() {
    const html =
        `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <title>Go Team, Go!</title>
    </head>
    <body class="bg-info">
        <div class="jumbotron jumbotron-fluid p-3 bg-dark">
            <div class="container">
                <h1 class="text-light text-center">Meet the Team</h1>
            </div>
        </div>
        <div class="container">
            <div class="row">`;
    fs.writeFile("./output/team.html", html, function (err) {
        if (err) {
            console.log(err);
        }
    });
}

function addHtml(employee) {
    return new Promise(function (resolve, reject) {
        const name = employee.getName();
        const role = employee.getRole();
        const id = employee.getId();
        const email = employee.getEmail();
        let data = "";
        if (role === "Engineer") {
            const gitHub = employee.getGithub();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Manager</h6> 
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">ID: ${id}</li>
                        <li class="list-group-item">Email Address: <a href="mailto:${email}">${email}</a></li>
                        <li class="list-group-item">GitHub: <a href="https://github.com/${gitHub}">${gitHub}</a></li>
                    </ul>
                </div>    
            </div>`
            ;
        } else if (role === "Intern") {
            const school = employee.getSchool();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Manager</h6> 
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">ID: ${id}</li>
                        <li class="list-group-item">Email Address: <a href="mailto:${email}">${email}</a></li>
                        <li class="list-group-item">School: ${school}</li>
                    </ul>
                </div>    
            </div>`
            ;
        } else {
            const officePhone = employee.getOfficeNumber();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Manager</h6> 
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">ID: ${id}</li>
                        <li class="list-group-item">Email Address: <a href="mailto:${email}">${email}</a></li>
                        <li class="list-group-item">Office Phone: ${officePhone}</li>
                    </ul>
                </div>    
            </div>`
        }
        fs.appendFile("./output/team.html", data, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    });
}

function finishHtml() {
    const html = `</div>
    </div>
</body>
</html>`;
    fs.appendFile("./output/team.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
}

init();