/***********************************************************
 **************** Homework for january 24 ******************
 ****************       28th session      ******************
 ***********************************************************/

// Task 1:
// For part-time object:
const partTime: PartTime = {
    id: 2,
    name: "Binh",
    salary: 20,
    hoursWorked: 40,
};

// Create new object & interface
interface PartTime {
    id: number;
    name: string;
    salary: number;
    hoursWorked: number;
}

const newPartTime: PartTime = {
    ...partTime,
    hoursWorked: 45,
};

console.log("partTime: ", partTime);
console.log("newPartTime: ", newPartTime);
console.log("--------------------------------------------------------- \n");

// Task 2
// 2.1 Create an Employee interface including:
// id: number
// name: string
// salary: number
// getSalary(): number
interface Employee {
    id: number;
    name: string;
    salary: number;
    getSalary: () => number;
}

// 2.2 Create class FullTimeEmployee implements Employee
// salary = salary
class FullTimeEmployee implements Employee {
    id = 10;
    name = "Nam";
    salary = 10000000;
    getSalary() {
        return this.salary;
    }
}

// 2.3 Create class PartTimeEmployee implements Employee
// Add the following attribute:
// hoursWorked: number
// salary = salary * hoursWorked
class PartTimeEmployee implements Employee {
    id = 11;
    name = "Hai";
    salary = 20000;
    hoursWorked = 40;

    getSalary() {
        return this.salary * this.hoursWorked;
    }
}

// 2.4 Function calculateTotalSalary(employees: Employee[]): number
// Calculate the total salary of all employees.
function calculateTotalSalary(employees: Employee[]): number {
    const totalSalary = employees.reduce((accTotalSalary, employee) => accTotalSalary + employee.getSalary(), 0);
    return totalSalary;
}

// 2.5 Create a usage example:
// 1 full-time employees
const fullTimeEmployee = new FullTimeEmployee();
console.log("id: " + fullTimeEmployee.id);
console.log("name: " + fullTimeEmployee.name);
console.log("salary: " + fullTimeEmployee.salary);
console.log("Actual salary received: " + fullTimeEmployee.getSalary());
console.log("--------------------------------------------------------- \n");

// 1 part-time employees
const partTimeEmployee = new PartTimeEmployee();
console.log("id: " + partTimeEmployee.id);
console.log("name: " + partTimeEmployee.name);
console.log("salary: " + partTimeEmployee.salary);
console.log("salary per hour: " + partTimeEmployee.hoursWorked);
console.log("Actual salary received: " + partTimeEmployee.getSalary());
console.log("--------------------------------------------------------- \n");

// Print total salary of all employees
const totalSalary = calculateTotalSalary([fullTimeEmployee, partTimeEmployee]);
console.log("Total salary of all employees: ", totalSalary);
console.log("--------------------------------------------------------- \n");
