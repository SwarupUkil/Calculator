
// Setup variables
const keypad = document.querySelector('.keypad');
const row = document.createElement('div');
const column = document.createElement('div');
const display = document.querySelector('#input');
const clear = document.querySelector('#footer');

let columnGrid = [];
let grid = [];
let gridSize = 4;
let input = '0';
let firstNum, operator, secondNum;
firstNum = operator = secondNum = '';
firstNum = input;
let valueVerifier = [0, 0, 0];
let operatorBool = false;

const calculatorOrdering =  [
                                ['7', '8', '9', '/'],
                                ['4', '5', '6', '*'],
                                ['1', '2', '3', '-'],
                                ['0', '.', '=', '+']
                            ];


// Initial manipulation of DOM for calculator.
row.classList.add('row');
column.classList.add('column');
createGrid();
display.textContent = input;


// Special case for the clear function.
clear.addEventListener('click', (event) => {
    input = '0';
    valueVerifier = [0, 0, 0];
    firstNum = operator = secondNum = '';
    firstNum = input;
    display.textContent = input;
});
clear.addEventListener('mouseover', (event) => {
    event.currentTarget.classList.add('hovering');
});
clear.addEventListener('mouseleave', (event) => {
    event.currentTarget.classList.remove('hovering');
});


// Creates the initial keypad for the calculator.
function createGrid(){
    for(let i = 0; i < gridSize; i++){
        for(let v = 0; v < gridSize; v++){
            columnClone = column.cloneNode();
            columnClone.textContent = calculatorOrdering[i][v];

            columnClone.addEventListener('click', (event) => {evaluate(event);});
            columnClone.addEventListener('mouseover', (event) => {
                event.currentTarget.classList.add('hovering');
            });
            columnClone.addEventListener('mouseleave', (event) => {
                event.currentTarget.classList.remove('hovering');
            });

            if ((v === gridSize - 1) || 
                (!parseInt(calculatorOrdering[i][0]) && v !== 0)){ // Row 4 is a specific case.
                columnClone.classList.add('operator');
            }else{
                columnClone.classList.add('number');
            }

            columnGrid.push(columnClone);
        }
    
        grid.push(columnGrid);
        columnGrid = [];
    }
    
    for(let i = 0; i < gridSize; i++){
        rowClone = row.cloneNode();
        for(let v = 0; v < gridSize; v++){
            rowClone.appendChild(grid[i][v]);
        }
        keypad.appendChild(rowClone);
    }
}


// The operation functions
let add = (a, b) => `${+a + +b}`;
let subtract = (a, b) => `${+a - +b}`;
let multiply = (a, b) => `${+a * +b}`;
let divide = (a, b) => `${Math.round(+a / +b)}`;

function operate(a, suboperator, b){
    switch(suboperator){
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}

function evaluate(event){

    let value = event.currentTarget.textContent;
    let deleting;

    if (event.currentTarget.classList.contains('number')){ // Case of number input
        
        if (!operatorBool){
            firstNum = parseInt(firstNum + value).toString();
            input = firstNum;
        }else{
            secondNum = parseInt(secondNum + value).toString();
            input = secondNum;
        }
    }else{ // Case of operator is input.

        if (value === '=' && secondNum !== ''){
            input = operate(firstNum, operator, secondNum);
            firstNum = input;
            operator = secondNum = '';
            operatorBool = false;

            // Deletion function repeated in the next two parts.
            deleting = Array.from(document.querySelectorAll('.operatorClicked'));
            deleting.forEach((operationDiv) => {
                operationDiv.classList.remove('operatorClicked');
            });

        }else if (value !== '=' && value !== '.' && secondNum === ''){
            operator = value;
            operatorBool = true;

            deleting = Array.from(document.querySelectorAll('.operatorClicked'));
            deleting.forEach((operationDiv) => {
                operationDiv.classList.remove('operatorClicked');
            });
            event.currentTarget.classList.add('operatorClicked');
        }else if (value !== '=' && value !== '.' && secondNum !== ''){
            input = operate(firstNum, operator, secondNum);
            firstNum = input;
            operator = secondNum = '';
            operator = value;
            operatorBool = true;

            deleting = Array.from(document.querySelectorAll('.operatorClicked'));
            deleting.forEach((operationDiv) => {
                operationDiv.classList.remove('operatorClicked');
            });
            event.currentTarget.classList.add('operatorClicked');
        }
    }

    display.textContent = input;
}