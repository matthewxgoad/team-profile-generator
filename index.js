const inquirer = require('inquirer');
const fs = require('fs');
const generateHtml = require('./src/page-template');
const jest = require('jest');
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const pageTemplate = require('./src/page-template')
const path = require('path')


async function init() {
    const userInput = await inquirer.
        prompt([
            {
                type: 'list',
                message: 'Please choose team member role.',
                choices: ['Manager', 'Intern', 'Engineer']
            }
        ])
}





init();