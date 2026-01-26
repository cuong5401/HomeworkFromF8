/////////////// Session 22 /////////////////
/////////////// January 4th ////////////////
////////////////////////////////////////////


// Check if it's a number.  
function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
}


// Lesson 1: Academic Performance Classification												
// 	Write a function that takes a student's score (0-10) as input and prints the classification:											
// 	9 - 10: Excellent											
// 	8 - under 9: Very Good											
// 	6.5 - under 8: Good											
// 	5 - under 6.5: Average											
// 	Under 5: Weak											
// 	Requirement: Check if the entered score is valid (0-10) before evaluating.	

function Evaluate(score) {
    let result;
    if (!isNumber(score) || score < 0 || score > 10) {
        result = "The score is outside the evaluation range";
    } else if (score >= 9) {
        result = "Excellent";
    } else if (score >= 8) {
        result = "Very Good";
    } else if (score >= 6.5) {
        result = "Good";
    } else if (score >= 5) {
        result = "Average";
    } else {
        result = "Weak";
    }
    console.log(result);
}
const studentScore = 6;
Evaluate(studentScore);


// Lesson 2: Days in a Month Calculator								
// 	Using a switch case, write a function that takes a month number (1-12) as input. 
// Print how many days are in that month.							

// 	Hint: Months 1, 3, 5, 7, 8, 10, 12 have 31 days. Months 4, 6, 9, 11 have 30 days.
//  Month 2 has 28 or 29 days (temporarily calculate as 28 days).	

function daysInMonth(inMonth) {
    let days;
    switch (inMonth) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            days = 31;
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            days = 30;
            break;
        case 2:
            days = 28;
            break;
        default:
            days = "Invalid input";
    }
    console.log(days);
}
const month = 8;
daysInMonth(month);


// Lesson 3: Even/Odd Check								
// 	Write a single line of code using the ternary operator to check variable n. 
// If n is even, return the string "Even", otherwise return "Odd".	
const n = 7;
const checkEvenOdd = (n % 2 === 0) ? "Even" : "Odd";
console.log(checkEvenOdd);


// Lesson 4: Movie Ticket Price Calculation								
// 	A cinema has a base ticket price of 100k.							
// 	If it's a child (under 13 years old), the ticket price is reduced by 50%.							
// 	Otherwise, the price remains 100k.							

// 	Requirement: Use the ternary operator to assign the value to the ticketPrice variable.	
const age = 10;
const ticketPrice = (age < 13) ? 50 : 100;
console.log(ticketPrice);


// Lesson 5: Temperature Conversion								
// 	Write a function to calculate the conversion from Celsius to Fahrenheit. Formula: F = C * 1.8 + 32	
function celsiusToFahrenheit(celsius) {
    if (!isNumber(celsius)) {
        console.log("Invalid input");
        return;
    }
    const fahrenheit = celsius * 1.8 + 32;
    console.log(fahrenheit);
}
const celsiusTemp = 38;
celsiusToFahrenheit(celsiusTemp);


// Lesson 6: Household Electricity Bill Calculation								
// 	Assume the electricity tariff for a household is calculated using 
//  the progressive method (tiered pricing) as follows:							
// 		Tier 1: For the first 50 kWh: 1,678 VND/kWh.						
// 		Tier 2: From the 51st to 100th kWh: 1,734 VND/kWh.						
// 		Tier 3: From the 101st to 200th kWh: 2,014 VND/kWh.						
// 		Tier 4: Above 200 kWh: 2,536 VND/kWh.						

// 	Write a function to calculate the electricity bill							
// 		Input: electricity consumption (kWh)						
// 		Output: amount to pay	

function calculateElectricityBill(consumption) {

    // check input
    if (!isNumber(consumption) || consumption < 0) {
        console.log("Invalid input");
        return;
    }

    // calculate bill
    let bill = 0;
    if (consumption <= 50) {
        bill = consumption * 1678;
    } else if (consumption <= 100) {
        bill = (50 * 1678) + ((consumption - 50) * 1734);
    } else if (consumption <= 200) {
        bill = (50 * 1678) + (50 * 1734) + ((consumption - 100) * 2014);
    } else {
        bill = (50 * 1678) + (50 * 1734) + (100 * 2014) + ((consumption - 200) * 2536);
    }

    console.log(bill + " VND");
}
const kWhUsed = 250;
calculateElectricityBill(kWhUsed);


