// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee")

class Manager extends Employee {
    constructor(name, role, id, email, officeNumber) {
      super(name, role, id, email)
      this.officeNumber = officeNumber
    }

    getOfficeNumber = () => {
        return(this.officeNumber)
    }
  }

module.exports = Manager;