class Calculator {
    constructor() {
        this.currentValue = '0';
        this.displayValue = '0';
        this.memory = 0;
        this.previousOperator = null;
        this.newNumber = true;
        this.firstNumber = null;
        this.result = document.getElementById('result');
        this.bindEvents();
    }

    bindEvents() {
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', () => {
                if (button.classList.contains('number')) {
                    this.handleNumber(button.textContent);
                } else if (button.classList.contains('operator')) {
                    this.handleOperator(button.textContent);
                } else if (button.classList.contains('equals')) {
                    this.calculate();
                } else if (button.classList.contains('function')) {
                    this.handleFunction(button.textContent);
                }
            });
        });
    }

    handleNumber(num) {
        if (this.newNumber) {
            this.currentValue = num === '+/-' 
                ? '0' 
                : num;
            if (this.previousOperator) {
                this.displayValue = this.firstNumber + ' ' + this.previousOperator + ' ' + this.currentValue;
            } else {
                this.displayValue = this.currentValue;
            }
            this.newNumber = false;
        } else {
            if (num === '+/-') {
                this.currentValue = -parseFloat(this.currentValue) + '';
            } else if (num === '.' && !this.currentValue.includes('.')) {
                this.currentValue += num;
            } else if (num !== '.') {
                this.currentValue += num;
            }
            
            if (this.previousOperator) {
                this.displayValue = this.firstNumber + ' ' + this.previousOperator + ' ' + this.currentValue;
            } else {
                this.displayValue = this.currentValue;
            }
        }
        this.updateDisplay();
    }

    handleOperator(operator) {
        if (!this.newNumber) {
            if (this.firstNumber === null) {
                this.firstNumber = this.currentValue;
            } else {
                this.calculate();
                this.firstNumber = this.currentValue;
            }
        }
        this.previousOperator = operator;
        this.displayValue = this.firstNumber + ' ' + operator + ' ';
        this.newNumber = true;
        this.updateDisplay();
    }

    calculate() {
        if (this.firstNumber === null || this.newNumber) return;
        
        let first = parseFloat(this.firstNumber);
        let second = parseFloat(this.currentValue);
        let result;

        switch (this.previousOperator) {
            case '+': result = first + second; break;
            case '-': result = first - second; break;
            case '×': result = first * second; break;
            case '÷': result = first / second; break;
        }
        
        this.displayValue = `${this.firstNumber} ${this.previousOperator} ${this.currentValue} = ${result}`;
        this.currentValue = result.toString();
        this.firstNumber = null;
        this.previousOperator = null;
        this.updateDisplay();
    }

    handleFunction(func) {
        switch(func) {
            case '清屏':
                this.currentValue = '0';
                this.displayValue = '0';
                this.memory = 0;
                this.previousOperator = null;
                this.firstNumber = null;
                this.newNumber = true;
                break;
            case '退格':
                if (this.currentValue.length > 1) {
                    this.currentValue = this.currentValue.slice(0, -1);
                    if (this.previousOperator) {
                        this.displayValue = this.firstNumber + ' ' + this.previousOperator + ' ' + this.currentValue;
                    } else {
                        this.displayValue = this.currentValue;
                    }
                } else {
                    this.currentValue = '0';
                    this.displayValue = '0';
                }
                break;
            case '存储':
                this.memory = parseFloat(this.currentValue);
                break;
            case '取存':
                this.currentValue = this.memory.toString();
                break;
            case '清存':
                this.memory = 0;
                break;
        }
        this.updateDisplay();
    }

    updateDisplay() {
        this.result.value = this.displayValue;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
}); 