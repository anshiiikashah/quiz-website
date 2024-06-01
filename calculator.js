const calculatorView = document.querySelector("#calculatorView")
const calculator = document.querySelector("#calculator");
var calcOn = false;

calculatorView.addEventListener("click",()=>{
    if (!calcOn){
        calculator.style.display = "flex"
        calcOn = true;
    }
    else{
        
        calculator.style.display = "none"
        calcOn = false;
    }
})

var text = ""
const screenInput = document.querySelector("#screenInput");
document.querySelector("#c").addEventListener('click',()=>{
    if (text!=""){
        
    console.log("clear")
        text=text.slice(0,-1)
    }
    else{
        text = "0"
    }
    renderScreen()
})
document.querySelector("#ac").addEventListener('click',()=>{
    text="0";
    renderScreen()
})
const btn = document.querySelectorAll(".calcBtn")
for (each of btn){
    each.addEventListener('click',(e)=>{
        if (e.currentTarget.id != "c" && e.currentTarget.id != "ac" && e.currentTarget.id != "equalbutton"){
            text+=e.currentTarget.innerHTML
        }
        renderScreen()

    })
}


function renderScreen(){
    screenInput.value = text;
}

document.querySelector("#equalbutton").addEventListener('click',()=>{
    text = String(eval(text))
    renderScreen()
})