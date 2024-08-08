const display = document.getElementById("display");
const animationText = document.getElementById('animationText');
const animationContainer = document.getElementById('animationContainer');
const animationSound = document.getElementById('animationSound');
const errorSound = document.getElementById('errorSound');
const clickSound = document.getElementById('clickSound');
const clearSound = document.getElementById('clearSound');
const eqSound = document.getElementById('eqSound');



function appendToDisplay (input){
    display.value += input;
    clickSound.play();

    if(display.value == 666){
        display.value = "SataN_is Here))";
       triggerAnimation();
       triggerAnimation_1();
   }
}

function clearDisplay(){
    display.value = "";
    clearSound.play();
}

function calculate(){
    try{
    display.value = eval(display.value);
    eqSound.play();    
    }
    catch(error){
        display.value = "Error, please stop!";
        errorSound.play();
    }
}

function triggerAnimation() {
    animationText.classList.add('animate');
    setTimeout(() => {
        animationText.classList.remove('animate');
    }, 2000); 
}

function triggerAnimation_1() {
    animationContainer.classList.add('animate');
    animationSound.play();
    setTimeout(() => {
        animationContainer.classList.remove('animate');
    }, 200000); 
}


