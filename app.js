let firstNumber;
let secondNumber;
let operator;
let displayValue;

const display = document.querySelector('.display')
const btnTest = document.getElementById('1');

btnTest.addEventListener('click', () => {
  console.log(btnTest);
  display.textContent += '1';
});

function add(num1, num2){
  return num1 + num2;
}

function subtract(num1, num2){
  return num1 - num2;
}

function multiply(num1, num2){
  return num1 * num2;
}

function divide(num1, num2){
  if (num2 === 0) {
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

