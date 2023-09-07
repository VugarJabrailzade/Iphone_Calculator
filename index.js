const myLabel = document.getElementById("hours");

update();

function update (){

    let date = new Date();
    myLabel.innerHTML =  formatTime(date)

    function formatTime(date){
        let hour = date.getHours();
        let minutes = date.getMinutes();

        hour = formatZero(hour);
        minutes = formatZero(minutes);

        return `${hour}:${minutes}`

    }

    function formatZero(time){
        time = time.toString();
        return time.length < 2 ? "0" + time : time
    }
}



const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");
const negative = document.querySelector(".negative");


let displayValue = `0`;
let firstValue = null;
let operator = null;
let previousWaitValue = false;

updateDisplay();


function updateDisplay(){
    display.value = displayValue; // bu funksiya ile aldigimiz deyeri display deyere otururuk.
}
    
buttons.forEach(button =>{
    button.addEventListener("click",(e) =>{
        const element = e.target;
        let value = element.value;

        if(element.classList.contains(`operator`)){
            funcOperator(element.value)
            updateDisplay();
            return;
        }
        if(element.classList.contains(`clear`)){
            clear()
            updateDisplay()
            return;
        }
        if(element.classList.contains(`decimal`)){
            inputDecimal(element.value);
            updateDisplay();
            return;
        }

        inputNumber(element.value);
        updateDisplay();


    })
})


function inputNumber(num){
    if(previousWaitValue){
        displayValue = num
        previousWaitValue= false;
    } 
    else{
        displayValue = displayValue === `0` ? num: displayValue + num;
    }
   
}


function inputDecimal(){
    if(!displayValue.includes(`,`)) return displayValue += `,`
}

function clear(){
    displayValue = `0`;
    updateDisplay();
}


function funcOperator(nextOperator){
    let value = parseFloat(displayValue);
    console.log(value)

    if( operator &&  previousWaitValue){
        operator = nextOperator;
        return;
        
    }

    if(firstValue === null){
        firstValue = displayValue;
    }
    else if(operator) {
        const result = calculate(firstValue, value, operator)

        displayValue = `${parseFloat(result.toFixed(5).valueOf())}` //ededlerin max fix sayi 7 olsun deye
        firstValue = result;
        console.log(result)
    }
   

    previousWaitValue = true;
    operator = nextOperator;

    // console.log( displayValue,firstValue, operator, previousWaitValue)
    updateDisplay();
}

function calculate(first, second, operator){
    if(operator === `+`){
        return first + second;
    } else if (operator === `-`) {
        return first - second;
    } else if (operator === `*`){
        return  first * second;
    }
    else if(operator === `%`){
        return (first * second)/100
    }
    else if ( operator === `/`){
        return first / second;
    } else if(operator === `+/-`){
        return first + second
    }
    
    return second;
}

//+/- Change number to negative or positive 
negative.addEventListener('click', () =>{
    display.value = "";
    if(firstValue != ""){
        display.value = -firstValue
         firstValue = display.value;
    }

    if(firstValue != "" &&  operator != ""){
        displayValue = -displayValue
    }

    // console.log(displayValue)
    updateDisplay();
})













// ashagidaki alinmiyan versiya. uzerinde ishlemek!

// const numbers = document.querySelectorAll(".num")
// const result = document.querySelector(".textIn");
// const negative = document.querySelector(".negative")
// const clear = document.querySelector(".clear")
// const equal = document.querySelector(".equal")
// const percent = document.querySelector(".percent")
// const operator = document.querySelectorAll(".operator")


// let firstValue = "";
// let isFirstValue = false;
// let secondValue = "";
// let isSecondValue = false;
// let sign = "";
// let resultValue = 0;

// numbers.forEach((num)=>{
//     num.addEventListener("click", (e)=>{
//         let atr = e.target.value;
//         if(isFirstValue === false){
//             getFirstValue(atr);
           
//         }
//     })
// })

// function getFirstValue(ev){
//     result.innerHTML = "";
//     firstValue += ev;
//     result.innerHTML = firstValue;
//     firstValue =+ firstValue;
// };
// function getSecondValue(el){
//     if(firstValue != "" && operator != ""){
//         secondValue += el;
//         result.innerHTML = secondValue;
//         secondValue =+ secondValue;
//     }
// };
// getSecondValue();

// function getOperator(){
//     for( let i = 0; i< operator.length; i++){
//         operator[i].addEventListener("click",(e)=>{
//             sign = e.target.value;
//             isFirstValue = true;
//         })
        
//     }
// };
// getOperator();

// equal.addEventListener("click",()=>{
//     result.innerHTML = "";
//     if(sign === "+"){
//         resultValue = firstValue + secondValue;
//     } else if (sign === "-"){
//        resultValue = firstValue - secondValue;
//     } else if (sign === "/"){
//          resultValue = firstValue / secondValue;
//     }else if (sign === "*"){
//        resultValue = firstValue * secondValue;
//     }
//     result.innerHTML = resultValue;
//     firstValue =resultValue;
//     secondValue = ""; 
//     console.log(firstValue)
    
// });

// negative.addEventListener('click', () =>{
//     result.innerHTML = "";
//     if(firstValue != ""){
//         resultValue = -firstValue
//         firstValue = resultValue
//     }
//     if(firstValue != "" && secondValue != "" && sign != ""){
//         resultValue = -resultValue
//     }

//     result.innerHTML = resultValue;
// })

