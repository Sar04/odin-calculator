const ONE = document.querySelector('#one');
const TWO = document.querySelector('#two');
const THREE = document.querySelector('#three');
const FOUR = document.querySelector('#four');
const FIVE = document.querySelector('#five');
const SIX = document.querySelector('#six');
const SEVEN = document.querySelector('#seven');
const EIGHT = document.querySelector('#eight');
const NINE = document.querySelector('#nine');
const ZERO = document.querySelector('#zero');
const ADD = document.querySelector('#add');
const SUBTRACT = document.querySelector('#subtract');
const MULTIPLY = document.querySelector('#multiply');
const DIVIDE = document.querySelector('#divide');
const DISPLAY = document.querySelector('.display');
const EQUALS =  document.querySelector('#equals');
const CLEAR = document.querySelector('#clear');
const POINT = document.querySelector('#decimal');
const DELETE = document.querySelector('#delete');
const NUMBERS =[ONE,TWO,THREE,FOUR,FIVE,SIX,SEVEN,EIGHT,NINE,ZERO];
const OPERATORS = [ADD,SUBTRACT,MULTIPLY,DIVIDE];

let problem = [];



NUMBERS.forEach(button => {
    button.addEventListener('click' , ()=>{
        inputNumber(button);
    });
});

OPERATORS.forEach(button => {
    button.addEventListener('click' , ()=>{
       inputOperator(button);
    })
});

EQUALS.addEventListener('click', ()=>{
    clearHighlight();
    if(problem.length==2){
        problem.pop();
    }else if(problem.length<3){
        return
    }else{
        solveProblem(problem);
        updateDisplay();
    }
    
});

CLEAR.addEventListener('click', ()=>{
    clearHighlight();
    problem.splice(0,problem.length);
    updateDisplay();
});

POINT.addEventListener('click' , ()=>{
    if(problem.length<1){
        problem.push('0.');
    }else if(problem.length % 2 == 0){
        return
    }else if(problem[problem.length-1].indexOf('.')<0){
        if(problem[problem.length-1].length<1){
            problem[problem.length-1] += '0.';
        }else{
            problem[problem.length-1] += '.';
        }        
    }
    updateDisplay();
});

DELETE.addEventListener('click' , ()=>{
    if(problem.length<1){
        return
    }else if(problem.length % 2 == 0){
        problem.pop();
        clearHighlight();
    }else{
        let strLen = problem[problem.length-1].length;
        if(strLen == 1){
            problem.pop();
        }else{
            problem[problem.length-1]=problem[problem.length-1].slice(0,strLen-1);
        }        
    }
    updateDisplay();
});

//functions

function updateDisplay(){
    if(problem.length<1){
        DISPLAY.textContent = '0';
    }else if(!Number.isFinite(Number(problem[problem.length-1]))){
        DISPLAY.textContent = problem[problem.length-2];
    }else{
        DISPLAY.textContent = problem[problem.length -1];
    }
}

function clearHighlight(){
    OPERATORS.forEach(button =>{
        button.classList.remove('highlight');
    });
}

function inputNumber(button){
    if(problem.length <1 ){
        problem.push(button.textContent);
    }else if(problem.length % 2 == 0){
        problem[problem.length] = button.textContent;
    }else{
        problem[problem.length-1] += button.textContent;
    }
    updateDisplay();
}

function inputOperator(button){
    clearHighlight();
    button.classList.add('highlight');
    if(problem.length<1){
        clearHighlight();
        alert('input a number first');
    }else if(problem.length>2){
        problem.push(button.textContent);
        solveProblem(problem);
    }else if(problem.length % 2 != 0){
        problem.push(button.textContent);
    }else{
        problem[problem.length - 1] = button.textContent;
    }
    updateDisplay();
}

function solveProblem(problem){
    if(problem[1] === '/' && problem[2] == 0){
        clearHighlight();
        problem.splice(0,problem.length);
        alert('no');
    }else{
        problem[2] = Math.round((calculate(problem[0],problem[1],problem[2]) + Number.EPSILON)*100)/100;
        problem.splice(0,2);
        problem[0] = problem[0].toString();
    }           
}

function calculate(nr1,operator,nr2){
   switch(operator){
    case '+':
        return add(nr1,nr2);
    case '-':
        return subtract(nr1,nr2);
    case '*':
        return multiply(nr1,nr2);
    case '/':
        return divide(nr1,nr2);
   }

}
function add(a,b){
    return Number(a) + Number(b);
}
function subtract(a,b){
    return Number(a) - Number(b);
}
function multiply(a,b){
    return Number(a) * Number(b);
}
function divide(a,b){
    return Number(a) / Number(b);
}

// keyboard functionality

document.addEventListener('keydown', (event)=>{
    console.log(event);
});
