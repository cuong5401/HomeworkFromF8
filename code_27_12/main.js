////// Homework for December 27 ////////////
////////////////////////////////////////////


// 1. Variable declaration and console.log

// Variable declaration
const name = "Cuong";
const age = 20;
const isStudent = false;

console.log("Name:", name);
console.log("Age:", age);
console.log("Is student:", isStudent);

// Initialize and change the value of a variable
let a = 5;
let b = 10;
a = 10;
b = 5;

// 2. const / let / var

// const is used to declare a constant (its value cannot be changed after initialization)
// let is used to declare a variable (its value can be reassigned after initialization or declaration)

// When should const be used?
// When declaring a variable that you feel does not need to change in the program, now or in the future,
// or when the variable represents a specific value to make the code more readable instead of writing the 
// literal value directly (for example: MENTEN_DELAY_500,...)

// const  = 10;
// x = 20; 
// ===> It causes an error because, as mentioned above, 'const' values cannot be changed.



// 3. Data type 

// Identify data types
// 100                      number
// "100"                    string
// true                     boolean
// [1, 2, 3]                array (special object)
// {name: "An", age: 20}    object
// null                     null
// undefined                undefined

// Create an object

const student = {
    name: "Cuong",
    age: 20,
    scores: [8, 9, 10]
}
console.log(student);


// 4. Type casting.

const typeNum = Number("1000");
const typeSgtring1 = String(1000);
const typeSgtring2 = String(true);

console.log("The data type of", typeNum, "is a", typeof (typeNum));
console.log("The data type of", typeSgtring1, "is a", typeof (typeSgtring1));
console.log("The data type of", typeSgtring2, "is a", typeof (typeSgtring2));


// 5. Truthy / Falsy (Logical thinking)

//  Boolean(0)	           false
//  Boolean(1)	           true
//  Boolean("")	           false
//  Boolean("hello")	   true
//  Boolean(null)	       false
//  Boolean([])	           true


// 6. Arrays & memory (related to the RAM diagram)

const numbers = [4, 3, 1, 5, 1];
console.log("the first value of the array:", numbers[0]);
console.log("the final value of the array:", numbers[4]);

// Explain in words (no code needed):
//   Why, when assigning:
//     const a = numbers;
//   do 'a' and 'numbers7 refer to the same memory location?
//
// Because 'numbers' is not a primitive value, it only stores a reference (address) to the actual array in heap memory.
// So when assigning 'a = numbers', it only passes that reference to 'a' instead of copying a new array.
// Therefore, both variables point to the same memory location.
