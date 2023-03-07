let buttons = document.querySelectorAll('.calc-button');
let display = document.querySelector('.calculation');
let numbers = document.querySelectorAll('.number');
let operators = document.querySelectorAll('.operate');
let currentNumber = document.querySelector('.current-number');
let equal = document.querySelector('#equals');
let clear = document.querySelector('#clear');
let decimal = document.querySelector('#deciaml');
let percentage = document.querySelector('#percent');

let firstNum = "";
let secondNum = "";
let operator = "";
let equalClicked = false;
let lastAnswer = 0;

percentage.addEventListener('click', () => {
    let number = Number(currentNumber.textContent);
    let displayPercent = percent(number);
    currentNumber.textContent = displayPercent;
});

buttons.forEach(button => button.addEventListener('mousedown', addClickStyle));
buttons.forEach(button => button.addEventListener('mouseup', removeClickStyle));
buttons.forEach(button => button.addEventListener('mouseleave', removeClickStyle));

numbers.forEach(number => number.addEventListener('click', getNumberValues));

operators.forEach(operator => operator.addEventListener('click', getOperatorValue));

clear.addEventListener('click', allClear);

equal.addEventListener('click', () => {
    let calculation = operate(operator, Number(firstNum), Number(secondNum));
    displayAnswer(calculation);
    display.textContent += secondNum;
    secondNum = "";
    lastAnswer = calculation;
    equalClicked = true;
});

function allClear() {
    firstNum = "";
    secondNum = "";
    operator = "";

    display.textContent = "";
    currentNumber.textContent = "0";

    equalClicked = false;
}

function addDecimal(e) {
    if (firstNum === "") {
        
    }
}

function getOperatorValue(e) {
    let operatorValue = this.value;

    if (equalClicked) {
        display.textContent = `${lastAnswer} ${operatorValue} `;
        currentNumber.textContent = "";
        operator = this.value;
        firstNum = lastAnswer;
        equalClicked = false;
    } else if (operator !== "") {
        display.textContent += `${secondNum} ${operatorValue} `;
        currentNumber.textContent = "";
        let calculation = operate(operator, Number(firstNum), Number(secondNum));
        firstNum = calculation;
        secondNum = "";

        operator = this.value;
    } else {
        display.textContent += `${firstNum} ${operatorValue} `;
        currentNumber.textContent = "";
        operator = this.value;
    }
}

function getNumberValues(e) {
    let number = this.value;

    if (operator === "") {
        firstNum += number;
    } else {
        if (equalClicked) {
            firstNum = currentNumber.textContent;
        }
        secondNum += number;
    }

    if (currentNumber.textContent === "0") {
        currentNumber.textContent = "";
        currentNumber.textContent += number;
    } else {
        currentNumber.textContent += number;
    }
}

function displayAnswer(value) {
    currentNumber.textContent = value;
}

function add(num1, num2) {
    return Math.round((num1 + num2) * 10000) / 10000;
}

function subtract(num1, num2) {
    return Math.round((num1 - num2) * 10000) / 10000;
}

function multiply(num1, num2) {
    return Math.round((num1 * num2) * 10000) / 10000;
}

function divide(num1, num2) {
    if (num2 === 0) {
        return "Try Again";
    }
    return Math.round((num1 / num2) * 10000) / 10000;
}

function percent(number) {
    return `${number * 100}%`;
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