////// Homework for December 30 ////////////
////////////////////////////////////////////


// Task 1:																	
// 	You are managing a class list. Follow the steps below to see how JavaScript handles arrays in memory.																
// 		Step 1: Create an array named classA containing the names: "An", "Binh", "Chi".															
const classA = ["An", "Binh", "Chi"];

// 		Step 2: Create a variable named classB and assign it the value of classA (classB = classA).															
const classB = classA;

// 		Step 3: Change the first element of classB to "An Updated".															
classB[0] = "An Updated";

// 		Step 4: Use console.log(classA) to check the original array.															
console.log(classA);

// 	Why was the name "An" in classA changed even though you only modified classB? Explain using the concept of Memory Addresses (e.g., 0x01).		
// When assigning `classB = classA`, since `classA` is an array, `classA` only stores the address of the array, while the actual array is stored in RAM.
// For example, if array `classA` has the address `0x01`, then `classB` will receive the value `0x01`.
// Therefore, when modifying elements in array `classB`, the pointer still refers to the same location `0x01`, so array `classA` is also modified.


// Task 2:									
//  Follow the JS code								
let x = "10";
let y = 2;
console.log(x + y);      // Result 1							
console.log(x - y);      // Result 2							
console.log(x * "3");    // Result 3							
console.log("Hello" - y);// Result 4							
// Requirements: 1. Explain why the addition (+) results in "102" while the subtraction (-) results in 8.
// The add operator: Acts as string concatenation if either operand is a string.
//  So JavaScript converts 'y' into a string and perform chaining

// The minus operator does not support string concatenation. 
// JavaScript tries to convert both operands to numbers. Then perform the calculation.

// 2. What does the result NaN in the last calculation mean? Why did it happen?
// NaN stands for Not a Number.
// It means JavaScript tried to perform a numeric operation, but failed.
// Because "Hello" cannot be converted into a number, the subtraction operation fails.


// Task 3:			
// Write a code snippet to check if a student is eligible to join the Programming Club.		
// Entry Conditions:	
// The student must be 10 years or older AND have a Math score above 7.
// OR, if they are a "VIP Member", they can enter regardless of age or score.

// Coding Requirements:	
// Declare 3 variables: age, mathScore, isVIP.
let age, mathScore, isVIP;
// Create a variable canEnter that uses logic operators(&&, ||) to calculate the result.Log the value to terminal screen
const canEnter = () => isVIP || (age >= 10 && mathScore > 7);
// Test your code with these cases:
// age = 9, mathScore = 10, isVIP = false -> (Result must be false)
age = 9;
mathScore = 10;
isVIP = false;
//Result: false
console.log(canEnter());

// age = 9, mathScore = 10, isVIP = true -> (Result must be true)
age = 9;
mathScore = 10;
isVIP = true;
//Result: true
console.log(canEnter());

// Logic Question: Is!(age < 10) mathematically the same as age >= 10 ?
// Yes, In !(age < 10), the expression age < 10 means that ages 10 and above are false.
// When adding not (!), it means that ages 10 and above become true, and this is equivalent to age >= 10.


// Task 4:								
// Objects can have "nested" data.Analyze the code below carefully.
const laptop = {
    brand: "Dell",
    price: 1000,
    spec: { ram: "8GB", ssd: "256GB" }
};

const myLaptop = laptop;
myLaptop.brand = "Apple";

const mySpec = laptop.spec;
mySpec.ram = "16GB";

console.log(laptop.brand);       // Predict: "Apple"
console.log(laptop.spec.ram);    // Predict: "16GB"
// Question: Before running the code, predict the values of laptop.brand and laptop.spec.ram.Explain why the changes made to myLaptop and mySpec affected the original laptop object.
// Essentially, both laptop and laptop.spec are arrays.
// So when assigning these two arrays to the variables myLaptop and mySpec, only the array addresses are assigned.
// Therefore, when modifying the arrays myLaptop and mySpec, the data in laptop and laptop.spec is also changed.
