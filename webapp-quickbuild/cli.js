const inquirer = require('inquirer');
const fs = require('fs');
const { generalSetup, frontendBuild, backendBuild, dbBuild } = require('./builder/builder');

console.log();
console.log('Welcome to webapp-quickbuild v0.1');
console.log('Please follow the instructions below:');
console.log();

var questions = [
    {
        type: 'list',
        name: 'backend',
        message: 'Please choose your backend:',
        choices: ['flask', 'express']
    },
    {
        type: 'list',
        name: 'frontend',
        message: 'Please choose your frontend:',
        choices: ['react']
    },
    {
        type: 'list',
        name: 'database',
        message: 'Please choose your database:',
        choices: ['MongoDB', 'MySQL', 'PostgreSQL']
    },
    {
        type: 'input',
        name: 'workdir',
        message: 'Your working directory:',
        validate: function(workdir) {
            const valid = fs.existsSync(workdir);
            return valid || 'Path does not exists';
        }
    }
];

inquirer.prompt(questions).then(answers => {
    generalSetup(answers.workdir);
    backendBuild(answers.backend);
    frontendBuild(answers.frontend);
    dbBuild(answers.database);
    console.log(JSON.stringify(answers));
});