const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, gitHubName) {
        super(name, id, email);
        this.gitHubName = gitHubName;
    }
    getRole() {
        return "Engineer";
    }
    getGithub() {
        return this.gitHubName;
    }
}

module.exports = Engineer;