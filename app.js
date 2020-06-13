const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const render = require("./lib/htmlRenderer");
const path = require("path");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");


// const writeHTML = function (render) {
//     writeFileAsync("./output/team.html", render);

// };

const managerInfo = [];
const engineerInfo = [];
const internInfo = [];
const team = [];
//manager

const MakeItSo = () => {
    console.log(
        "Team manager."
    );
    inquirer
        .prompt([
            {
                type: "input",
                message: "Managers Name",
                name: "name"
            },
            {
                type: "input",
                message: "Manager office number?",
                name: "officeNumber"
            },
            {
                type: "input",
                message: "Manager email address?",
                name: "email"
            },
            {
                type: "input",
                message: "Manager ID number?",
                name: "id"
            }
        ])
        .then(function (data) {
            const teamManager = new Manager(
                data.name,
                data.id,
                data.email,
                data.officeNumber,
                "Manager"
            );
            team.push(teamManager);
        })
        .then(function () {
            more();
        });
};

//interns

const newIntern = () => {
    inquirer
        .prompt([
            {
                type: "input",
                message: "New Team Member's name?",
                name: "name"
            },
            {
                type: "input",
                message: "ID number?",
                name: "id"
            },
            {
                type: "input",
                message: "Email address?",
                name: "email"
            },
            {
                type: "input",
                message: "School Attended?",
                name: "school"
            }
        ])
        .then(function (res) {
            const member = new Intern(
                res.name,
                res.id,
                res.email,
                res.school,
                "Intern"
            );
            team.push(member);
        })
        .then(function () {
            more();
        });
};

//engineer

const newEngineer = () => {
    inquirer
        .prompt([
            {
                type: "input",
                message: "New Team Member Name?",
                name: "name"
            },
            {
                type: "input",
                message: "ID number?",
                name: "id"
            },
            {
                type: "input",
                message: "Email address?",
                name: "email"
            },
            {
                type: "input",
                message: "GitHub username?",
                name: "github"
            }
        ])
        .then(function (res) {
            const employee = new Engineer(
                res.name,
                res.id,
                res.email,
                res.github,
                "Engineer"
            );
            team.push(employee);
        })
        .then(function () {
            more();
        });
};

const more = () => {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Add additional team members?",
                name: "add",
                choices: ["yes", "no"]
            }
        ])
        .then(function (res) {
            if (res.add == "yes") {
                addAnother();
                // } else done(managerInfo, engineerInfo, internInfo);
            } else done(team);

        })
};

// new team memeber

const addAnother = () => {
    console.log(
        "Next team member info."
    );
    inquirer
        .prompt([
            {
                type: "list",
                message: "Engineer or an Intern?",
                name: "job",
                choices: ["Engineer", "Intern"]
            }
        ])
        .then(function (res) {
            if (res.job == "Engineer") {
                newEngineer();
            } else newIntern();
        });
};

async function done(team) {

    console.log(
        "Adding Members"
    );

    fs.writeFileSync(outputPath, render(team), "utf-8");
};

MakeItSo();
