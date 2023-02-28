let buttons = document.querySelectorAll('.calc-button');
let display = document.querySelector('.calculation');
let numbers = document.querySelectorAll('.number');
let operators = document.querySelectorAll('.operate');
let answer = document.querySelector('.answer');
let equal = document.querySelector('#equals');
let clear = document.querySelector('#clear');

let firstNum = "";
let secondNum = "";
let operator = "";

buttons.forEach(button => button.addEventListener('mousedown', addClickStyle));
buttons.forEach(button => button.addEventListener('mouseup', removeClickStyle));
buttons.forEach(button => button.addEventListener('mouseleave', removeClickStyle));

numbers.forEach(number => number.addEventListener('click', numberScreen));
numbers.forEach(number => number.addEventListener('click', storeNumberValues));

operators.forEach(operator => operator.addEventListener('click', operatorScreen));
operators.forEach(operator => operator.addEventListener('click', storeOperatorValue));

clear.addEventListener('click', allClear);

// operators.forEach(button => button.addEventListener('click', () => {
//     if (operator !== "") {
//         displayAnswer(operate(operator, Number(firstNum), Number(secondNum)));
//         // firstNum = answer.textContent;
//         // secondNum = "";
//     }
// }));

equal.addEventListener('click', () => {
    displayAnswer(operate(operator, Number(firstNum), Number(secondNum)));
    firstNum = answer.textContent;
    secondNum = "";
});

function allClear() {
    firstNum = "";
    secondNum = "";
    operator = "";

    display.textContent = "0";
    answer.textContent = "";
}

function operatorScreen(e) {
    let operatorValue = this.value;

    display.textContent += ` ${operatorValue} `;
}

function storeOperatorValue(e) {
    operator = this.value;
}

function numberScreen(e) {
    let number = this.value;

    if (display.textContent === "0") {
        display.textContent = "";
        display.textContent += number;
    } else {
        display.textContent += number;
    }
}

function storeNumberValues(e) {
    if (operator === "") {
        firstNum += this.value;
    } else {
        secondNum += this.value;
    }
}

function displayAnswer(value) {
    answer.textContent = value;
}

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
    }
}

function addClickStyle(e) {
    this.classList.add("clicked");
}

function removeClickStyle(e) {
    this.classList.remove("clicked");
}