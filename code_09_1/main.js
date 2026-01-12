////// Homework for january 9 ////////////
////////////////////////////////////////////


// task 1: Checking for Prime Numbers
// Write a function `isPrime(n)` to check if a positive integer n is a prime number.
// Definition:
// A prime number is a number greater than 1 that is divisible only by 1 and itself.

function isPrime(n) {
    if (n <= 1) {
        return false;
    }
    for (let i = 2; i <= n ** (1 / 2); i++) {
        if (n % i === 0) {
            return false;
        }
    }
    return true;
}

console.log(isPrime(19)); // true
console.log(isPrime(15)); // false


// task 2: Checking for Perfect Numbers
// Write a function `isPerfectNumber(n)` to check if a positive integer n is a perfect number.
// Definition:
// A perfect number is a number that is equal to the sum of its positive divisors (excluding itself).
function isPerfectNumber(n) {
    if (n <= 1) {
        return false;
    }
    let sum = 0;
    for (let i = 1; i <= n / 2; i++) {
        if (n % i === 0) {
            sum += i;
        }
    }
    return sum === n;
}
console.log(isPerfectNumber(6)); // true
console.log(isPerfectNumber(10)); // false