let buttons = document.querySelectorAll('.calc-button');
let display = document.querySelector('.calculation');
let numbers = document.querySelectorAll('.number');
let operators = document.querySelectorAll('.operate');

buttons.forEach(button => button.addEventListener('mousedown', addClickStyle));
buttons.forEach(button => button.addEventListener('mouseup', removeClickStyle));
buttons.forEach(button => button.addEventListener('mouseleave', removeClickStyle));

numbers.forEach(number => number.addEventListener('click', changeScreen));
operators.forEach(operator => operator.addEventListener('click', operatorScreen));

function operatorScreen(e) {
    let operator = this.value;

    display.textContent += ` ${operator} `;
}

function changeScreen(e) {
    let value = this.value;

    if (display.textContent === "0") {
        display.textContent = "";
        display.textContent += value;
    } else {
        display.textContent += value;
    }
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