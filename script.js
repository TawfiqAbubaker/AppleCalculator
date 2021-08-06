const numberButtons = document.querySelectorAll('.numbers');
const operatorButtons = document.querySelectorAll('.operators');
const textArea = document.querySelector('.textArea h4');
const miniTextArea = document.querySelector('.textArea p');
const equalsButton = document.querySelector('#equals')
const c = document.querySelector("#c")
const positiveNegative = document.querySelector("#positiveNegative")
const deleteButton =  document.querySelector("#delete");

let operatorNumber = 0;
let operator = "";
let operationsNumber = 0;
let firstNumber = "0";
let first = true;
let secondNumber = "";
let dotUsedFirst = false;
let dotUsedSecond = false;

miniTextArea.style.cssText = "color: #141414;"

for(const numberButton of numberButtons){
    numberButton.addEventListener('click', function(){
        console.log(firstNumber.length)
        console.log(firstNumber.length)
        if((firstNumber.length <= 10 && first == true)|| (secondNumber.length <= 10 && first==false)){
            if(first == true){
                if(numberButton.textContent == "." && dotUsedFirst == false){
                    firstNumber += numberButton.textContent;
                    dotUsedFirst = true;
                }
                else if(firstNumber == "-0"){
                    firstNumber = "-" + numberButton.textContent;
                }
                else if(firstNumber == "0"){
                    firstNumber = numberButton.textContent;
                }
                else if (numberButton.textContent != "."){
                    firstNumber += numberButton.textContent;
                }
            }
            else{
                if((numberButton.textContent == "." && dotUsedSecond == false)|| numberButton.textContent != "."){
                    secondNumber += numberButton.textContent;
                }
                if(numberButton.textContent == "."){
                    dotUsedSecond = true;
                }
                
            }
            textArea.textContent = firstNumber + operator + secondNumber;
            operationsNumber += 1; 
            length_adjuster();
        }
    
    })
}
for(const operatorButton of operatorButtons){
    operatorButton.addEventListener('click', function(){
        if(operationsNumber != 0 && (operatorNumber == 0) && first==true){
            operator = operatorButton.textContent;
            textArea.textContent = firstNumber + operator + secondNumber;
            first = false; 
            operationsNumber += 1;
        }
        
    })
}

equalsButton.addEventListener('click', function(){
    miniTextArea.textContent = textArea.textContent;
    miniTextArea.style.cssText = "color: white;"
    if(operator == "x"){
        textArea.textContent = Math.round((parseFloat(firstNumber,10) * parseFloat(secondNumber,10))*1000)/1000;   
    }
    if(operator == "+"){
        textArea.textContent = Math.round((parseFloat(firstNumber,10) + parseFloat(secondNumber,10))*1000)/1000;   
    }
    if(operator == "-"){
        textArea.textContent = Math.round((parseFloat(firstNumber,10) - parseFloat(secondNumber,10))*1000)/1000;   
    }
    if(operator == "÷"){
        textArea.textContent = Math.round((parseFloat(firstNumber,10) / parseFloat(secondNumber,10))*1000)/1000;   
    }
    firstNumber = textArea.textContent;
    secondNumber = "";
    operator = "";
    first = true;
    operationsNumber = textArea.textContent.length;
    operatorNumber = 0;
})
c.addEventListener('click', function(){
    operatorNumber = 0;
    operator = "";
    operationsNumber = 0;
    firstNumber = "0";
    first = true;
    secondNumber = "";
    miniTextArea.style.cssText = "color: #141414;"
    textArea.textContent = "0";
    length_adjuster();
    dotUsedSecond = false;
    dotUsedFirst = false;

})
positiveNegative.addEventListener('click',function(){
    if(first == true && firstNumber.slice(0,1) != "-"){
        firstNumber = "-" + firstNumber;
    }
    else if(first == true && firstNumber.slice(0,1) == "-"){
        firstNumber = firstNumber.slice(1,firstNumber.length);
    }
    if(first == false){
        if((operator == "x" || operator == "÷" )&& secondNumber.slice(0,1) != "-"){
            secondNumber = "-" + secondNumber;
        }
        else if (secondNumber.slice(0,1) == "-"){
            secondNumber = secondNumber.slice(1,secondNumber.length);
        }
        else if (operator == "-"){
            operator = "+";
        }
        else if (operator == "+"){
            operator = "-";
        }
    }
    textArea.textContent = firstNumber + operator + secondNumber;
})
deleteButton.addEventListener('click', function(){
    if(first == true){
        if(firstNumber.length == 1){
            firstNumber = "0"
        }
        else{
            firstNumber = firstNumber.slice(0,length-1)
        }
        
    }
    else{
        if((textArea.textContent.length-firstNumber.length) == 1){
            operator = "";
            first = true;
        }
        else{
            secondNumber = secondNumber.slice(0,length-1)
        }
    }
    textArea.textContent = firstNumber + operator + secondNumber;
    operationsNumber -= 1;
    length_adjuster();
})

function length_adjuster(){
    if(operationsNumber < 10){
        textArea.style.cssText = "font-size: 50px;"
    }
    if(operationsNumber >= 10){
        textArea.style.cssText = "font-size: 40px; padding-bottom: 51px;"
    }
    if(operationsNumber >= 13){
        textArea.style.cssText = "font-size: 30px; padding-bottom: 63px;"
    }
    if(operationsNumber >= 17){
        textArea.style.cssText = "font-size: 20px; padding-bottom: 74px;"
    }
}