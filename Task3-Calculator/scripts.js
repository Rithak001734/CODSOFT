const resultElement = document.getElementById('result');
const clearBtn = document.getElementById('clear-button');
const deleteBtn = document.getElementById('delete-button');
const divideBtn = document.getElementById('divide-button');
const multiplyBtn = document.getElementById('multiply-button');
const subtractBtn = document.getElementById('subtract-button');
const addBtn = document.getElementById('add-button');
const decimalBtn = document.getElementById('decimal-button');
const equalBtn = document.getElementById('equal-button');
const numberBtns = document.querySelectorAll('.number');
const modulusBtn = document.getElementById('modulus-button');
const doubleZeroButton = document.getElementById('doublezero-button');



//intialize the variables
let result = '';
let operation = '';
let previousOperand = 0;

//function to append number
const appendNumber = (number) =>{
    if(number === '.' && result.includes('.')) return;
    result += number;
    updateDisplay(); 
}

//function to update display
const updateDisplay = () => {
    if (operation) {
        resultElement.innerText = `${previousOperand} ${operation} ${result}`;
    }
    else {
        resultElement.innerText = result;
    }
    
}
//function to select operator
const selectOperator = (opeatorValue) => {
    if (result === '')return;
    
    if (operation !== '' && previousOperand !== ''){
        calculateResult();
    }

    operation = opeatorValue;
    previousOperand=result;
    result = '';
    updateDisplay();
}

//function to calculate result
const calculateResult = () =>{
    let evalutedResult;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(result);
    
    if (isNaN(prev) || isNaN(current)) return; 

    switch(operation){
        case '+':
            evalutedResult = prev + current;
            break;
        case '-':
            evalutedResult = prev - current;
            break;
        case '*':
            evalutedResult = prev * current;
            break;
        case '/':
            evalutedResult = prev / current;
            break;
        case '%':
            evalutedResult = prev % current;
            break;    
        default:
            return;            
    }
    result = evalutedResult.toString();
    operation = '';
    previousOperand = '';
}

//Add event listner
numberBtns.forEach(button =>{
    button.addEventListener('click', ()=> {
        appendNumber(button.innerText);
    })
});
//functionto clear display
const clearDisplay = () =>{
    result = '';
    previousOperand = '';
    operation = '';
    updateDisplay(); 
}
//function to delete last character
const deleteLastDigit = () => {
    if(operation !=='' && result === ''){
        operation ='';
        result = previousOperand;
        previousOperand = '';
        updateDisplay();     
    }
    else{
        result = result.slice(0,-1);
        updateDisplay();
    }
}
function appendToDisplay(value) {
    const resultElement = document.getElementById('result');
    const currentText = resultElement.textContent;

    // Check if the current text is '0' or an empty string
    // If it is, replace it with the new value
    if (currentText === '0' || currentText === '') {
        resultElement.textContent = value;
    } else {
        resultElement.textContent += value;
    }
}

decimalBtn.addEventListener('click', () => appendNumber('.'));
addBtn.addEventListener('click', () => selectOperator('+'));
subtractBtn.addEventListener('click', () => selectOperator('-'));
multiplyBtn.addEventListener('click', () => selectOperator('*'));
divideBtn.addEventListener('click', () => selectOperator('/'));
modulusBtn.addEventListener('click', () => selectOperator('%'));
equalBtn.addEventListener('click', () =>{
    if (result === '')return;
    calculateResult();
    updateDisplay();
});
clearBtn.addEventListener('click', clearDisplay);
deleteBtn.addEventListener('click', deleteLastDigit);
doubleZeroButton.addEventListener('click', function () {
    appendToDisplay('00');
});