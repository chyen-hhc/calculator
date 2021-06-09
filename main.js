class Calculator {
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        
        this.clear()
    }
    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }
    appendNumber(number){
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()

    }
    chooseOperation(operation){
        if (this.currentOperand === '') return
        if (this.currentOperand !== '') {
            this.compute()
        }        
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
        
    }
    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const cur = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(cur)) return 
        switch (this.operation) {
            case '+':
                computation = cur +prev
                break;
            case '-':
                computation = prev - cur
                break;
            case '*':
                computation = prev * cur
                break;        
            case '÷':
                computation = prev / cur
                break;        
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)){
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
            maximumFractionDigits: 0})
        }
        if (decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }
    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null)
        this.previousOperandTextElement.innerText = `${this.previousOperand}  ${this.operation}` 
        
    }
}
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operand]');
const equalsButtons = document.querySelector('[data-equal]');
const deleteButtons = document.querySelector('[data-del]');
const clearButtons = document.querySelector('[data-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');

const currentOperandTextElement = document.querySelector('[data-current-operand]');




const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement)

numberButtons.forEach(button =>{
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button =>{
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText)        
        calculator.updateDisplay()  
    })
})

equalsButtons.addEventListener('click',button =>{
    calculator.compute()
    calculator.updateDisplay()
})

clearButtons.addEventListener('click',button =>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButtons.addEventListener('click',button =>{
    calculator.delete()
    calculator.updateDisplay()
})


//-----------------------------CLOCK-------------------------//

setInterval(setClock, 1000)


const hourHand = document.querySelector('[data-hour-hand]')
const minuteHand = document.querySelector('[data-minute-hand]')
const secondHand = document.querySelector('[data-second-hand]')

function setClock() {
    const currentDate = new Date()
    const secondsRatio = currentDate.getSeconds() / 60
    const minutesRatio = (currentDate.getMinutes()+secondsRatio) / 60
    const hoursRatio = (minutesRatio + currentDate.getHours()) / 12
    setRotation(secondHand, secondsRatio)
    setRotation(minuteHand, minutesRatio)
    setRotation(hourHand, hoursRatio)
    
}

function setRotation(element, rotationRatio) {
    element.style.setProperty('--rotation', rotationRatio*360)
}

setClock()
