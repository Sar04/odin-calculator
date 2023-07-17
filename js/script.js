
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
const NUMBERS =[ONE,TWO,THREE,FOUR,FIVE,SIX,SEVEN,EIGHT,NINE,ZERO];
const OPERATORS = [ADD,SUBTRACT,MULTIPLY,DIVIDE];

function updateDisplay2(){
    DISPLAY.textContent = problem.join("");
}

function updateDisplay(){
    if(!Number.isFinite(Number(problem[problem.length-1]))){
        return
    }else{
        DISPLAY.textContent = problem[problem.length -1];
    }
}

NUMBERS.forEach(button => {
    button.addEventListener('click' , () => {
        if(problem.length <1 ){
            problem.push(button.textContent);
        }else if(problem.length % 2 == 0){
            problem[problem.length] = button.textContent;
        }else{
            problem[problem.length-1] += button.textContent;
        }
        updateDisplay();
    });
});

OPERATORS.forEach(button => {
    button.addEventListener('click' , ()=>{
        if(problem.length<1){
            alert('input a number first');
        }else if(problem.length % 2 != 0){
            problem.push(button.textContent);
        }else{
            problem[problem.length - 1] = button.textContent;
        }
        updateDisplay();
    })
});

EQUALS.addEventListener('click', ()=>{
    solveProblem(problem);
    updateDisplay();
});

CLEAR.addEventListener('click', ()=>{
    problem.splice(0,problem.length);
    updateDisplay();
});


let problem =[];
function solveProblem(problem){
    while(problem.length>1){
        if(problem[1] === '/' && problem[2] === '0'){
            problem.splice(0,problem.length);
            alert('no');
        }else{
            problem[2] = Math.round((calculate(problem[0],problem[1],problem[2]) + Number.EPSILON)*100)/100;
            problem.splice(0,2);
        }
        
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
