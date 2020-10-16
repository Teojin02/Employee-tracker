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

const employeeTypeInquiry = [{
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
        id
    }) => {
        let manager = new Manager(name,officeNumber, id, email );
        if (name !== "" && officeNumber !== "" && email !== "" && id  !== "" && !isNaN(officeNumber)) {
            employees.push(manager);
            createEmployees();
        } else {
            console.log("Insert valid input");
            init();
        }
    })
}

function createEmployees() {
    prompt(employeeTypeInquiry ).then((data) => {
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
        ...generalInquiry,
        engineerInquiry
    ]).then(({
        name,
        email,
        id,
        github
    }) => {
        let engineer = new Engineer(name, email, id,  github);
        if (name !== "" && id !== "" && email !== "" && github !== "") {
            employees.push(engineer);
            createEmployees();
        } else {
            console.log("Insert valid input");
            createEngineer();
        }
    })
}

function createIntern() {
    prompt([
        ...generalInquiry,
        internInquiry
    ]).then(({
        name,
        email,
        id,
        school
    }) => {
        let intern = new Intern(name, email, id,  school);
        if (name !== "" && id !== "" && email !== "" && school !== "") {
            employees.push(intern);
            createEmployees();
        } else {
            console.log("Insert valid input");
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