let miniDisplay;
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
  }
}; //Store [firstNumber, operator, secondNumber]

const display = document.querySelector('.display')
const btnTest = document.getElementById('1');
const btns = Array.from(document.querySelectorAll('.calc-button'));

function setButtonListener(btns) {
  for (let btn of btns){
    btn.addEventListener('click', () => {
      handleBtnInput(btn.value, btn.id)
    });
  }
}

function handleBtnInput(btnInput, btnID) {
  if (btnID === 'number'){
    handleNumberInput(btnInput)
    console.log("Handled: " + btnInput);
  } else if (btnID === 'operator'){
    handleOperatorInput(btnInput);
    console.log("Handled: " + btnInput);
  }
  console.log("input = " + input);
}

function handleNumberInput(btnInput) {
  if (input.operator) {
    console.log("seconf od " + input.secondNumber);
    input.secondNumber = input.secondNumber ? input.secondNumber + btnInput : btnInput;
  } else {
    input.firstNumber = input.firstNumber ? input.firstNumber + btnInput : btnInput;
  }
  updateDisplay()
}

function handleOperatorInput(btnInput) {
  if(input.secondNumber){
    //miniDisplay = input.join(" ");
    //console.log("Mini display = " + miniDisplay);
    input.firstNumber = operate(input.pop(), input.pop(), input.pop());
  }
  input.operator = btnInput;
  updateDisplay();
}

function updateDisplay() {
  display.textContent = input.join(" ");
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

function operate(num2, operator, num1) {
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
