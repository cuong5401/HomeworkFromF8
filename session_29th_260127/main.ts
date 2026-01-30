/***********************************************************
 **************** Homework for january 27 ******************
 ****************       29th session      ******************
 ***********************************************************/

// Create an Employee with the following properties:
// Properties:
// id: number
// name: string
// salary: number
// Methods:
// getId(): number
// getName(): string
// setName(name: string)
// getSalary(): number
// setSalary(salary: number)
//      Salary must be > 0, otherwise an error will be reported.
// calculateSalary(): number (method will be overridden - abstract method)

abstract class Employee {
    protected id: number;
    protected name: string;
    protected salary: number;

    constructor(id: number, name: string, salary: number) {
        this.id = id;
        this.name = name;
        this.salary = salary;
    }

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string): void {
        this.name = name;
    }

    getSalary(): number {
        return this.salary;
    }

    setSalary(salary: number): void {
        if (salary <= 0) {
            console.log("Salary must be greater than zero. ");
            return;
        }
        this.salary = salary;
    }
    abstract calculateSalary(): number;
}

// Developer
// Add the property overtimeHours: number
// setSalary: salary = salary + overtimeHours * 50,000

class Developer extends Employee {
    private overtimeHours: number;

    constructor(id: number, name: string, salary: number, overtimeHours: number) {
        super(id, name, salary);
        this.overtimeHours = overtimeHours;
    }

    setSalary() {
        this.salary = this.salary + this.overtimeHours * 50000;
    }

    calculateSalary(): number {
        return this.salary;
    }
}

const dev = new Developer(1, "Alice", 2000000, 10);
console.log(dev);
console.log("dev id: ", dev.getId());
console.log("dev name: ", dev.getName());
dev.setName("Bob");
console.log("dev new name: ", dev.getName());
console.log("dev salary: ", dev.getSalary());
dev.setSalary();
console.log("dev new salary: ", dev.getSalary());

// Manager
// Add team attribute Size: number
// setSalary: salary = salary + team Size * 200,000

class Manager extends Employee {
    private teamSize: number;

    constructor(id: number, name: string, salary: number, teamSize: number) {
        super(id, name, salary);
        this.teamSize = teamSize;
    }

    setSalary() {
        this.salary = this.salary + this.teamSize * 200000;
    }

    calculateSalary(): number {
        return this.salary;
    }
}
const manager = new Manager(1, "Alice", 2000000, 10);
console.log(manager);
console.log("manager id: ", manager.getId());
console.log("manager name: ", manager.getName());
console.log("manager salary: ", manager.getSalary());
manager.setSalary();
console.log("manager new salary: ", manager.getSalary());
