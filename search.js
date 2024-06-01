const dd = document.querySelector("#dropdown");
const quizBox = document.querySelectorAll(".quizBox");
const allCategories = document.querySelectorAll(".category")

function showOGScreen() {
    for (each of allCategories) {
        each.style.display = "none";
    }
    for (each of quizBox) {
        each.style.display = "none";
    }
    document.querySelector("#container").style.display = "flex";
}

dd.addEventListener('click', () => {
    for (each of allCategories) {
        each.style.display = "none";
    }
    if (dd.value == "") {
        showOGScreen()
    }
    else {

        document.querySelector("#container").style.display = "none";
        document.querySelector(`#${dd.value}Quizzes`).style.display = "grid";
        let quizzes = document.querySelectorAll(`#${dd.value}Quizzes>div`);
        for (each of quizzes) {
            each.style.display = "flex";
        }
    }
})


const searchQuiz = document.querySelector("#searchQuiz");

searchQuiz.addEventListener('input', () => {
    let elem = document.getElementById(searchQuiz.value)
    console.log(searchQuiz.value)
    if (elem == undefined) {
        showOGScreen()
    }
    else {
        
        document.querySelector("#container").style.display = "none";
        for (each of quizBox) {
            each.style.display = "none";
        }
        console.log(elem)
        elem.style.display = "flex";
        for (each of allCategories){
            each.style.display = "grid"
        }

    }
})

showOGScreen()