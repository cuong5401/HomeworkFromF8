////// Homework for january 6 ////////////
////////////////////////////////////////////

// task 1
// Given three variables a, b, and c representing the lengths of the three sides of a triangle.
// Write a function to check if the three sides form a triangle.
// Conditions: a + b > c, a + c > b, and b + c > a.
// If it is a triangle, classify it as follows:
// Equilateral triangle: a = b = c.
// Isosceles triangle: Two sides are equal. Right triangle:
// Satisfies the Pythagorean theorem (a² = b² + c² or similar).
// General triangle: All other cases.

const sideA = 4;
const sideB = 3;
const sideC = 5;

function isRightTriangle(x, y, z) {
    return (x * x === y * y + z * z) || (y * y === x * x + z * z) || (z * z === x * x + y * y);
}

function classifyTriangle(a, b, c) {

    // Check for non-positive sides
    if (a <= 0 || b <= 0 || c <= 0) {
        return "Not a valid triangle";
    }
    // Check if it is a valid triangle
    if (!(a + b > c && a + c > b && b + c > a)) {
        return "Not a valid triangle";
    }

    //  Classify the triangle
    if (a === b && b === c) {
        return "Equilateral triangle";
    }
    else if (a === b || a === c || b === c) {
        if (isRightTriangle(a, b, c)) {
            return "Isosceles right triangle";
        }
        return "Isosceles triangle";
    }
    else if (isRightTriangle(a, b, c)) {
        return "Right triangle";
    }

    return "General triangle";
}

console.log(classifyTriangle(sideA, sideB, sideC));

// task 2
// Given any number 'a', write a function to check if that number is a perfect square.
// A perfect square is the square of a natural number, e.g., 4, 9, 16, ....
function isPerfectSquare(num) {
    if (num < 0) return false;
    const sqrt = Math.sqrt(num);
    return sqrt === Math.floor(sqrt);
}
console.log(isPerfectSquare(16)); // true
console.log(isPerfectSquare(47)); // false