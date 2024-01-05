let firstNumber;
let secondNumber;
let operator;
//let displayValue;
let input = [];

const display = document.querySelector('.display')
const btnTest = document.getElementById('1');
const btns = Array.from(document.querySelectorAll('.calc-button'));

function setButtonListener(btns){
  for (let btn of btns){
    btn.addEventListener('click', () => {
      console.log(btn.value);
      handleBtnInput(btn.value, btn.id)
    });
  }
}

function handleBtnInput(btnInput, btnID){
  if (btnID === 'number'){
    handleNumberInput(btnInput)
    console.log("Handled: " + btnInput);
  }
}

function handleNumberInput(btnInput) {
  if (operator) {
    secondNumber = secondNumber ? secondNumber + btnInput : btnInput;
    input[2] = secondNumber;
  } else {
    firstNumber = firstNumber ? firstNumber + btnInput : btnInput;
    input[0] = firstNumber;
  }

  console.log("input = " + input);
  //updateDisplay()
}


function add(num1, num2){
  return +num1 + +num2 + '';
}

function subtract(num1, num2){
  return num1 - num2;
}

function multiply(num1, num2){
  return num1 * num2;
}

function divide(num1, num2){
  if (num2 === '0') {
    return "Error";
  }
  return num1 / num2;
}

function operate(num1, num2, operator){
  if(operator === '+'){
    return add(num1, num2);
  } else if (operator === '-'){
    return subtract(num1, num2);
  } else if (operator === 'x'){
    return multiply(num1, num2)
  } else if (operator === '/'){
    return divide(num1, num2);
  }
}


//On load
setButtonListener(btns);
