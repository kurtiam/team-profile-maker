
class Employee {
    constructor(name, id, email, title) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.title = title;
    }

    //name
    getName(name) {
        return this.name;
    }

    // id
    getId(id) {
        return this.id;
    }

    // mail
    getEmail(email) {
        return this.email;
    }

    //role
    getRole(title) {
        return "Employee";
    }
}

module.exports = Employee;