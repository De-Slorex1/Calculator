class Calculator{
    constructor(previousOperationText, nextOperationText){
        this.previousOperationText = previousOperationText
        this.nextOperationText = nextOperationText
        this.clear()
    }

    clear(){
        this.nextOperation = ""
        this.previousOperation = ""
        this.operation = undefined
    }
    delete(){
        this.nextOperation = this.nextOperation.toString().slice(0, -1)
    }
    appendNumber(number){
        if(number === "." && this.nextOperation.includes(".")) return
        this.nextOperation = this.nextOperation.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.nextOperation === "") return
        if(this.previousOperation !== ""){
            this.compute()
        }
        this.operation = operation
        this.previousOperation = this.nextOperation
        this.nextOperation = ''
    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOperation)
        const next = parseFloat(this.nextOperation)
        if(isNaN(prev) || isNaN(next)) return
        switch(this.operation) {
            case "+":
                computation = prev + next
                break
            case "-":
                computation = prev - next
                break
            case "*":
                computation = prev * next
                break
            case "/":
                computation = prev / next
                break
            default:
                return
            }
            this.nextOperation = computation
            this.operation = undefined
            this.previousOperation = ""
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split(".")[0])
        const decimalDigits = stringNumber.split(".")[1]
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay = ""
        }
        else{
            integerDisplay = integerDigits.toLocaleString("en", {
            maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        }
        else{
            return integerDisplay
        }
    }

    updateDisplay(){
        this.nextOperationText.innerText = 
            this.getDisplayNumber(this.nextOperation)
        if(this.operation != null){
            this.previousOperationText.innerText = 
                `${this.getDisplayNumber(this.previousOperation)} ${this.operation}`
        }
        else{
            this.previousOperation.innerText = ""
        }
        
    }
}

const numberButtons =document.querySelectorAll("#data-number");
const operationButtons = document.querySelectorAll("#data-operation");
const equalsButton = document.querySelector("#data-equals");
const deleteButton = document.querySelector("#data-delete");
const allClearButton = document.querySelector("#data-all-clear");
const previousOperationText = document.querySelector("#data-previous-operand");
const nextOperationText = document.querySelector("#data-current-operand");

const calculator = new Calculator(previousOperationText, nextOperationText)

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener("click", button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener("click", button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener("click", button => {
    calculator.delete()
    calculator.updateDisplay()
})