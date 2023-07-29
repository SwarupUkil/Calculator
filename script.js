// * irk 1: each div isn't same size, like bottom row is not equivalent to above.
// Give each number a class and each operation a class.

// Hover -> lights up each button by some percentage I guess.
// Pressing -> causes a border to appear for a second.
// input length max needed. 
// Make sure to replace the first zero. Guess its a leading zero things.
// rounding needs to be better.

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
    display.textContent = input;
});


// Creates the initial keypad for the calculator.
function createGrid(){
    for(let i = 0; i < gridSize; i++){
        for(let v = 0; v < gridSize; v++){
            columnClone = column.cloneNode();
            columnClone.textContent = calculatorOrdering[i][v];
            columnClone.addEventListener('click', 
            (event) => {
                input += event.currentTarget.textContent;
                display.textContent = input;
                // event.currentTarget.classList.add('black');
            });
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

function operate(a, b, operator){
    switch(operator){
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