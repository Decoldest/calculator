let memoryValue = 0;
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
  } else if (btnID === '='){
    calculate();
  }
}

function handleNumberInput(btnInput) {
  if (input['operator']) {
    input['secondNumber'] = input['secondNumber'] ? input['secondNumber'] + btnInput : btnInput;
  } else {
    input['firstNumber'] = input['firstNumber'] ? input['firstNumber'] + btnInput : btnInput;
  }
  updateDisplay()
}

function handleOperatorInput(btnInput) {
  if (!input['firstNumber']) return;

  if (input['secondNumber']) {
    miniDisplay.textContent = input.join();
    input['firstNumber'] = operate(input.pop(), input.pop(), input.pop()).toString();
  }
  input['operator'] = btnInput;
  updateDisplay();
}

function calculate() {
  console.log("calculating");
  if(input['secondNumber']) {
    input['firstNumber'] = operate(input.pop(), input.pop(), input.pop()).toString();
  }
  miniDisplay.textContent = "";
  updateDisplay();
}

function updateDisplay() {
  display.textContent = input.join();
}

function deleteDigit() {
  console.log(input.join());
  let lastInput = input['secondNumber'] ? 'secondNumber' : input['operator'] ? 'operator' : 
    input['firstNumber'] ? 'firstNumber' : null;

  if (lastInput) input[lastInput] = input[lastInput].slice(0,-1);
 
  updateDisplay();
}

function clearDisplay() {
  miniDisplay.textContent = "";
  input.clear();
  updateDisplay();
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
  if (num2 === '0') {
    return "Error";
  }
  return num1 / num2;
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
  }
}


//On load
setButtonListener(btns);
