const ADD = document.querySelector('#add');
const SUBTRACT = document.querySelector('#subtract');
const MULTIPLY = document.querySelector('#multiply');
const DIVIDE = document.querySelector('#divide');
const DISPLAY = document.querySelector('.display');
const EQUALS =  document.querySelector('#equals');
const CLEAR = document.querySelector('#clear');
const POINT = document.querySelector('#decimal');
const DELETE = document.querySelector('#delete');
const NUMBERS = Array.from(document.querySelectorAll('.number'));
const OPERATORS = [ADD,SUBTRACT,MULTIPLY,DIVIDE];

let problem = [];



NUMBERS.forEach(button => {
    button.addEventListener('click' , ()=>{
        inputNumber(button.textContent);
    });
});

OPERATORS.forEach(button => {
    button.addEventListener('click' , ()=>{
       inputOperator(button);
    })
});

EQUALS.addEventListener('click', ()=>{
    equals();    
});

CLEAR.addEventListener('click', ()=>{
    clearHighlight();
    problem.splice(0,problem.length);
    updateDisplay();
});

POINT.addEventListener('click' , ()=>{
    point();
});

DELETE.addEventListener('click' , ()=>{
    del();
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

function inputNumber(text){
    if(problem.length <1 ){
        problem.push(text);
    }else if(problem.length % 2 == 0){
        problem[problem.length] = text;
    }else if(problem.length == 1 && problem[0] == 0 && problem[0].indexOf('.')<0){
        problem[0] = text;
    }else{
        problem[problem.length-1] += text;
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

function del(){
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
}

function equals(){
    clearHighlight();
    if(problem.length==2){
        problem.pop();
    }else if(problem.length<3){
        return
    }else{
        solveProblem(problem);
        updateDisplay();
    }
}

function point(){
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
   console.log(event.key);
   if(!isNaN(Number(event.key))){
    inputNumber(event.key);
   }
   switch(event.key){
    case '+': 
        inputOperator(ADD);
        break
    case '-':
         inputOperator(SUBTRACT);
         break
    case '*':
        inputOperator(MULTIPLY);
        break
    case '/': 
        inputOperator(DIVIDE);
        break
    case 'Enter':
        equals();
        break
    case '=':
       equals();
        break
    case 'Backspace':
        del();
        break
    case 'Delete':
        del();
        break
    case '.':
        point();
        break
    }
});
