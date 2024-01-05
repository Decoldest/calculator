let input = {
  firstNumber : '',
  operator : '',
  secondNumber : '',
  pop(){
    if(this.secondNumber){
      let temp = this.secondNumber;
      this.secondNumber = '';
      return temp;
    } else if (this.operator){
      let temp = this.operator;
      this.operator = '';
      return temp;
    } else {
      let temp = this.firstNumber;
      this.firstNumber = '';
      return temp;
    }
  },
  join(){
    return `${this.firstNumber} ${this.operator} ${this.secondNumber}`;
  },
  clear(){
    this.firstNumber = '';
    this.operator = '';
    this.secondNumber = '';
  }
}; //Store [firstNumber, operator, secondNumber]

let memoryValue = 0;
const MAX_LENGTH = 18;
const MAX_DECIMALS = 10;

const display = document.querySelector('.display')
const miniDisplay = document.querySelector('.mini-display');
const btns = Array.from(document.querySelectorAll('.calc-button'));

function setButtonListener(btns) {
  for (let btn of btns){
    btn.addEventListener('click', () => {
      handleBtnInput(btn.value, btn.id)
    });
  }
}

function handleBtnInput(btnInput, btnID) {
  if (btnID === 'number') {
    handleNumberInput(btnInput)
  } else if (btnID === 'operator') {
    handleOperatorInput(btnInput);
  } else if (btnID === 'del') {
    deleteDigit();
  } else if (btnID === 'ac') {
    clearDisplay();
  } else if (btnID === '=') {
    calculate();
  } else if (btnID === '.') {
    handleDecimal();
  } else if (btnID === 'sqrt') {
    handleSqrt();
  }
  updateDisplay();
}

function handleNumberInput(btnInput) {
  if (!checkLengthLimit(input.join(), MAX_LENGTH)) {
    return;
  }
  if (input['operator']) {
    input['secondNumber'] = input['secondNumber'] ? input['secondNumber'] + btnInput : btnInput;
  } else {
    input['firstNumber'] = input['firstNumber'] ? input['firstNumber'] + btnInput : btnInput;
  }
}

function handleOperatorInput(btnInput) {
  if (!checkLengthLimit(input.join(), MAX_LENGTH)) {
    return;
  }

  if (!input['firstNumber']) return;
  
  if (input['secondNumber']) {
    miniDisplay.textContent = input.join();
    input['firstNumber'] = operate(input.pop(), input.pop(), input.pop()).toString();
  }
  input['operator'] = btnInput;
}

function calculate() {
  if(input['secondNumber']) {
    input['firstNumber'] = operate(input.pop(), input.pop(), input.pop()).toString();
  }
  miniDisplay.textContent = "";
}

function updateDisplay() {
  display.textContent = input.join();
}

function deleteDigit() {
  console.log(input.join());
  let lastInput = input['secondNumber'] ? 'secondNumber' : input['operator'] ? 'operator' : 
    input['firstNumber'] ? 'firstNumber' : null;

  if (lastInput) input[lastInput] = input[lastInput].slice(0,-1);
 }

function handleDecimal() {
  lastInput = input['secondNumber'] ? 'secondNumber' : input['operator'] ? null : 
    input['firstNumber'] ? 'firstNumber' : null;
    if (lastInput) {
      if (/^\d+$/.test(input[lastInput]))
      input[lastInput] += '.';
    }
}

function handleSqrt(){
  if(!input['operator'] && !input['secondNumber']) {
    input['firstNumber'] = operate(null, 'sqrt', input['firstNumber']).toString()
  }
}

function clearDisplay() {
  miniDisplay.textContent = "";
  input.clear();
  updateDisplay();
}

function checkLengthLimit(word, MAX_LENGTH) {
  console.log(word + " "  + MAX_LENGTH);
  return word.length <= MAX_LENGTH;
}

function add(num1, num2) {
  return +num1 + +num2 + '';
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  let result;
  if (num2 === '0') {
    return "Error";
  }
  result = num1 / num2;

  const decimalPlaces = getDecimalPlaces(result);

  result = applyDecimalLimit(result, decimalPlaces);

  return result;

  function getDecimalPlaces(number) {
    return (number.toString().split('.')[1] || '').length;
  }

  function applyDecimalLimit(result, decimalPlaces) {
    if (decimalPlaces > MAX_DECIMALS) {
      result = parseFloat(result.toFixed(MAX_DECIMALS));
    }
    return result;
  }
}



function sqrt(num1) {
  return Math.sqrt(num1);
}

function pow(num1, num2) {
  return Math.pow(num1, num2);
}

function operate(num2, operator, num1) {
  if(operator === '+'){
    return add(num1, num2);
  } else if (operator === '-'){
    return subtract(num1, num2);
  } else if (operator === 'x'){
    return multiply(num1, num2)
  } else if (operator === '/'){
    return divide(num1, num2);
  } else if (operator === '^'){
    return pow(num1, num2)
  } else if (operator === 'sqrt'){
    return sqrt(num1)
  }
}


//On load
setButtonListener(btns);
