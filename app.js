const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const render = require("./lib/htmlRenderer");
const writeFileAsync = util.promisify(fs.writeFile);

const writeHTML = function (generateHTML) {
    writeFileAsync("./output/team.html", generateHTML);

};

const manager = [];
const engineer = [];
const intern = [];

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
            manager.push(teamManager);
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
            intern.push(member);
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
            engineer.push(employee);
        })
        .then(function () {
            more();
        });
};


async function done(manager, engineer, intern) {

    console.log(
        "Adding Members"
    );

    render(manager, engineer, intern);
    writeHTML(render(manager, engineer, intern));
};

// more input?

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
            } else done(manager, engineer, intern);

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

console.log(engineer.getName)
MakeItSo();





// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
