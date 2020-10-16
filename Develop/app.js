const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const prompt = inquirer.createPromptModule();
const employees = [];
//questions
const engineerInquiry = {
    message: "Enter GitHub username",
    type: "input",
    name: "github"
}

const internInquiry = {
    message: "Enter intern's school",
    type: "input",
    name: "school"
}

const managerInquiry = {
    message: "Enter manager's office number",
    type: "number",
    name: "officeNumber"
}



const generalInquiry = [{
        message: "Enter name",
        type: "input",
        name: "name"
    }, {
        message: "Please enter ID",
        type: "input",
        name: "id"
    },
    {
        message: "Please enter Email",
        type: "input",
        name: "email"
    }
];

const employeeTypeQuestion = [{
    message: "What type of team member would you like to add?",
    name: "role",
    type: "list",
    choices: [
        "Intern",
        "Engineer",
        "No more adds"
    ]
}];

function init() {
    prompt([
        ...generalInquiry,
        managerInquiry
    ]).then(({
        name,
        officeNumber,
        email,
        id,
    }) => {
        let manager = new Manager(name, id, email, officeNumber);
        if (name !== "" && id !== "" && email !== "" && officeNumber !== "" && !isNaN(officeNumber)) {
            employees.push(manager);
            createEmployees();
        } else {
            console.log("Please enter valid input");
            init();
        }
    })
}

function createEmployees() {
    prompt(employeeTypeQuestion).then((data) => {
        if (data.role === "Engineer") {
            createEngineer();
        } else if (data.role === "Intern") {
            createIntern();
        } else {
            //generate HTML and write file
            writeToFile("./output/team.html", render(employees));
        }
    })
}

function createEngineer() {
    prompt([
        ...generalQuestions,
        engineerQuestion
    ]).then(({
        name,
        id,
        email,
        github
    }) => {
        let engineer = new Engineer(name, id, email, github);
        if (name !== "" && id !== "" && email !== "" && github !== "") {
            employees.push(engineer);
            createEmployees();
        } else {
            console.log("Please enter valid input");
            createEngineer();
        }
    })
}

function createIntern() {
    prompt([
        ...generalQuestions,
        internQuestion
    ]).then(({
        name,
        id,
        email,
        school
    }) => {
        let intern = new Intern(name, id, email, school);
        if (name !== "" && id !== "" && email !== "" && school !== "") {
            employees.push(intern);
            createEmployees();
        } else {
            console.log("Please enter valid input");
            createIntern();
        }
    })
}

// function to write file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
            throw err;
        }
        console.log("Successful");
    });
}

init();