const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");


const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { title } = require("process");


let employees = []

// manager questions
const managerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: "What's is your manager's name?",
        validate: function (value) {
            if (value.trim() == '') {
                return 'Please enter a valid name';
            }
            else {
                return true
            }
        }
    },
    {
        type: 'input',
        name: 'id',
        message: "What is their id number?",
        validate: function (value) {
            if (value.trim() == '') {
                return 'Please enter a valid id';
            }
            else {
                return true
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: "What is their email?",
        validate: function (value) {
            if (value.trim() == '') {
                return 'Please enter a valid email';
            }
            else {
                return true
            }
        }
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: "What is their office number?",
        validate: function (value) {
            if (value.trim() == '') {
                return 'Please enter a valid office Number';
            }
            else {
                return true
            }
        }
    }
];

// intern questions
const internQuestions = [
    {
        type: 'input',
        name: 'name',
        message: "What is your intern's name?",
        validate: function (value) {
            if (value.trim() == '') {
                return 'Please enter a valid name';
            }
            else {
                return true
            }
        }
    },
    {
        type: 'input',
        name: 'id',
        message: "What is their id number?",
        validate: function (value) {
            if (value.trim() == '') {
                return 'Please enter a valid id';
            }
            else {
                return true
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: "What is their email?",
        validate: function (value) {
            if (value.trim() == '') {
                return 'Please enter a valid email';
            }
            else {
                return true
            }
        }
    },
    {
        type: 'input',
        name: 'school',
        message: "What is their school?",
        validate: function (value) {
            if (value.trim() == '') {
                return 'Please enter a valid office Number';
            }
            else {
                return true
            }
        }
    },
    {
        type: 'confirm',
        name: 'addAnother',
        message: "Intern added. Would you like to add another?",
        default: false
    }
];

// engineer questions
const engineerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: "What is your engineer's name?",
        validate: function (value) {
            if (value.trim() == '') {
                return 'Please enter a valid name';
            }
            else {
                return true
            }
        }
    },
    {
        type: 'input',
        name: 'id',
        message: "What is their id number?",
        validate: function (value) {
            if (value.trim() == '') {
                return 'Please enter a valid id';
            }
            else {
                return true
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: "What is their email?",
        validate: function (value) {
            if (value.trim() == '') {
                return 'Please enter a valid email';
            }
            else {
                return true
            }
        }
    },
    {
        type: 'input',
        name: 'github',
        message: "What is their github?",
        validate: function (value) {
            if (value.trim() == '') {
                return 'Please enter a github';
            }
            else {
                return true
            }
        }
    },
    {
        type: 'confirm',
        name: 'addAnother',
        message: "Engineer added. Would you like to add another?",
        default: false
    }
];

const askManagerQuestions = async () => {
    await inquirer.prompt(managerQuestions).then(answers => {
        let role = "Manager"
        let name = answers.name
        let id = answers.id
        let email = answers.email
        let officeNumber = answers.officeNumber
    
        let manager = new Manager(name, role, id, email, officeNumber)
    
        employees.push(manager)
        askInternQuestions()
    })
}

const askInternQuestions = async () => {
    let allInternsAdded = false
    while (!allInternsAdded) {
        await inquirer.prompt(internQuestions).then(answers => {
            let role = "Intern"
            let name = answers.name
            let id = answers.id
            let email = answers.email
            let school = answers.school
            let addAnother = answers.addAnother

            let intern = new Intern(name, role, id, email, school)
            employees.push(intern)

            if (!addAnother) {
                allInternsAdded = true;
                askEngineerQuestions()
            }
        })
    }
}

const askEngineerQuestions = async () => {
    let allEngineersAdded = false
    while (!allEngineersAdded) {
        await inquirer.prompt(engineerQuestions)
            .then(answers => {
                let role = "Engineer"
                let name = answers.name
                let id = answers.id
                let email = answers.email
                let github = answers.github
                let addAnother = answers.addAnother
    
                let engineer = new Engineer(name, role, id, email, github)
                employees.push(engineer)
    
                if (!addAnother) {
                    allEngineersAdded = true;
                    let html = render(employees)
                    fs.writeFileSync("../output/team.html", html)
                }
            })
    }
}

askManagerQuestions()