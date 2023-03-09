let buttons = document.querySelectorAll('.calc-button');
let display = document.querySelector('.calculation');
let numbers = document.querySelectorAll('.number');
let operators = document.querySelectorAll('.operate');
let currentNumber = document.querySelector('.current-number');
let equal = document.querySelector('#equals');
let clear = document.querySelector('#clear');
let decimal = document.querySelector('#decimal');
let percentage = document.querySelector('#percent');
let positiveNegative = document.querySelector('#positiveNegative');

let firstNum = "";
let secondNum = "";
let operator = "";
let equalClicked = false;
let lastAnswer = 0;
let decimalAllowed = true;
let percentAllowed = false;

percentage.addEventListener('click', () => {
    if (percentAllowed) {
        let displayPercent = percent(lastAnswer);
        currentNumber.textContent = displayPercent;
    }
});

buttons.forEach(button => button.addEventListener('mousedown', addClickStyle));
buttons.forEach(button => button.addEventListener('mouseup', removeClickStyle));
buttons.forEach(button => button.addEventListener('mouseleave', removeClickStyle));

numbers.forEach(number => number.addEventListener('click', getNumberValues));

operators.forEach(operator => operator.addEventListener('click', getOperatorValue));

decimal.addEventListener('click', addDecimal);

clear.addEventListener('click', allClear);

equal.addEventListener('click', () => {
    let calculation = operate(operator, Number(firstNum), Number(secondNum));
    displayAnswer(calculation);
    display.textContent += secondNum;
    secondNum = "";
    lastAnswer = calculation;
    equalClicked = true;
    percentAllowed = true;
    decimalAllowed = false;
});

positiveNegative.addEventListener('click', () => {
    if (currentNumber.textContent.includes('-')) {
        let positive = currentNumber.textContent.slice(1);
            currentNumber.textContent = positive;
    
            if (operator === "") {
                firstNum = positive;
            } else if (!equalClicked) {
                secondNum = positive;
            } else {
                lastAnswer = positive;
            }
        } else if (currentNumber.textContent === "0") {
            currentNumber.textContent = "-";
        } else {
            let negative = currentNumber.textContent.split("")
            negative.unshift("-");
            negative = negative.join("");
            currentNumber.textContent = negative
    
            if (operator === "") {
                firstNum = negative;
            } else if (!equalClicked) {
                secondNum = negative;
            } else {
                lastAnswer = negative;
            }
        }
});

function allClear() {
    firstNum = "";
    secondNum = "";
    operator = "";

    display.textContent = "";
    currentNumber.textContent = "0";

    equalClicked = false;
    decimalAllowed = true;
    percentAllowed = false;
}

function addDecimal(e) {
    if (decimalAllowed) {
        currentNumber.textContent += this.value;

        if (operator === "") {
            firstNum += this.value;
        } else {
            secondNum += this.value;
        }

        decimalAllowed = false;
    }
}

function getOperatorValue(e) {
    decimalAllowed = true;
    percentAllowed = false;

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
        if (currentNumber.textContent === "-") {
            firstNum += "-";
        }
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
    num = Math.round((number * 100) * 10000) / 10000;
    return `${num}%`;
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