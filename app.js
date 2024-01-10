let input = {
  firstNumber : '',
  operator : '',
  secondNumber : '',
  memoryValue : '',
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

const MAX_LENGTH = 18;
const MAX_DECIMALS = 10;
let justOperated = false;
let isError = false;

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
  if (isError) {
    isError = !isError;
    clearDisplay();
  }

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
  } else if (btnID === 'memory'){
    handleMemoryInput(btnInput);
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
    checkIfJustOperated()
    input['firstNumber'] = input['firstNumber'] ? input['firstNumber'] + btnInput : btnInput;
  }

  function checkIfJustOperated(){
    if(justOperated) {
      clearDisplay();
      justOperated = !justOperated;
    }
  }
}

function handleOperatorInput(btnInput) {
  if (!checkLengthLimit(input.join(), MAX_LENGTH)) {
    return;
  }

  if (!input['firstNumber']) return;
  
  if (input['secondNumber']) {
    if(!miniDisplay.textContent){
      miniDisplay.textContent = input.join();
    } else {
      miniDisplay.textContent += ` ${input['operator']} ${input['secondNumber']}`
    }
    
    input['firstNumber'] = operate(input.pop(), input.pop(), input.pop()).toString();
  }
  input['operator'] = btnInput;
}

function calculate() {
  justOperated = !justOperated;

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
  if (lastInput && /^\d+$/.test(input[lastInput])) {
    input[lastInput] += '.';
  }
}

function handleSqrt() {
  if(!input['operator'] && !input['secondNumber']) {
    input['firstNumber'] = operate(null, 'sqrt', input['firstNumber']).toString()
  }
}

function handleMemoryInput(btnInput) {
  if (btnInput === 'mc') {
    input.memoryValue = '';
  } else if (btnInput === 'mr') {
    lastInput = input['secondNumber'] ? null : input['operator'] ? 'secondNumber' : 
      input['firstNumber'] ? null : 'firstNumber';
    if (lastInput) {
      input[lastInput] = input.memoryValue;
    }
  } else if (btnInput === 'm+') {
    input.memoryValue += +input['firstNumber'];
  } else if (btnInput === 'm-') {
    input.memoryValue -= +input['firstNumber'];
  }
}

function clearDisplay() {
  miniDisplay.textContent = "";
  input.clear();
  updateDisplay();
}

function checkLengthLimit(word, MAX_LENGTH) {
  const isValidLength = word.length <= MAX_LENGTH;

  if (!isValidLength) {
    alert("Digit length limit reached");
  }

  return isValidLength;
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
    isError = !isError;
    return "Math Error";
  }
  result = num1 / num2;
  
  return fixDecimals(result);
}

function fixDecimals(number){
  const decimalPlaces = getDecimalPlaces(number);

  return applyDecimalLimit(number, decimalPlaces);

  function getDecimalPlaces(number) {
    return (number.toString().split('.')[1] || '').length;
  }
  
  function applyDecimalLimit(number, decimalPlaces) {
    if (decimalPlaces > MAX_DECIMALS) {
      number = parseFloat(number.toFixed(MAX_DECIMALS));
    }
    return number;
  }
}

function sqrt(num1) {
  return fixDecimals(Math.sqrt(num1));
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
