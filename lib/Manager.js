const Employee = require("./Employee")

class Manager extends Employee {
    constructor(name, id, email, officeNumber, title) {
        super(name, id, email, "Manager");
        this.officeNumber = officeNumber;
        this.title = title;
    }

    getOfficeNumber(officeNumber) {
        return this.officeNumber;
    }

    getRole(title) {
        return "Manager";
    }
}

module.exports = Manager;