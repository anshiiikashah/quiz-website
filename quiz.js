function shuffle(array) {
    function choice(array) {
        return array[Math.floor(Math.random() * (array.length - 0) + 0)];
    }
    let copy = [];
    for (each of array) {
        copy.push(each)
    }
    let shuffled = []
    for (let i = 0; i < array.length; i++) {
        let elem = choice(copy);
        shuffled.push(elem)
        copy.splice(copy.indexOf(elem), 1);
    }
    return shuffled;
}




class Question {
    constructor(question, answer, options, level) {
        this.question = question;
        this.answer = answer;
        this.options = options;
        this.user = "";
        this.timetaken = 0;
        this.level = level;
    }
    addAnswer(uAns) {
        this.user = uAns;
    }
    addTime(time) {
        this.timetaken = time;
    }
}

var all = {
    "India": [new Question("What is the capital of India", "Delhi", ["Moscow", "Delhi", "Kolkata", "Lucknow"], "Easy"), new Question("Who was India ruled by?", "Britain", ["USA", "Britain", "Egypt", "China"], "Easy"), new Question("When did India get independent", "1947", ["1946", "1947", "1948", "1949"], "Easy")],
    "Rivers": [new Question("Which is the longest river in the world?", "Nile", ["Amazon", "Nile", "Yangtze", "Mississippi"], "Easy"), new Question("Which is the largest river in the world?", "Amazon", ["Nile", "Yangtze", "Mekong", "Amazon"], "Easy"), new Question("Which of the following rivers is considered the lifeline of China?", "Yantze", ["Brahmaputra", "Yellow", "Mekong", "Yantze"], "Easy")],
    "Mountains": [new Question("Which of the following is the tallest mountain in the world?", "Mount Everest (Asia)", ["Mount Everest (Asia)", "K2 (Asia)", "Denali (North America)", "Mount Kilimanjaro (Africa)"], "Easy"), new Question("What type of mountain is formed by volcanic eruptions, often having a conical peak?", "Volcanic Mountain", ["Fold Mountain", "Block Mountain", "Volcanic Mountain", "Mesa"], "Easy"), new Question("Which mountain is located on the border between France and Italy?", "Mont Blanc", ["Mont Blanc", "Mount Everest", "K2", "Matterhorn"], "Easy")],
    "Biology": [new Question("What is the process by which water moves through a plant, from the roots to the leaves, and is then released into the air as water vapor?", "Transpiration", ["Respiration", "Photosynthesis", "Transpiration", "Evaporation"], "Easy"), new Question("Which part of a cell contains the genetic material?", "Nucleus", ["Mitochondria", "Nucleus", "Cytoplasm", "Cell Wall"], "Easy"), new Question("What is the scientific term for the 'building blocks of life'?", "Cells", ["Molecules", "Tissues", "Cells", "Organisms"], "Easy")],
    "Physics": [new Question("What is the unit of force in the International System of Units?", "Newton", ["Joule", "Newton", "Pascal", "Watt"], "Easy"), new Question("Who is credited with the discovery of the laws of motion?", "Isaac Newton", ["Galileo Galilei", "Albert Einstein", "Isaac Newton", "Marie Curie"], "Easy"), new Question("What is the scientific term for the 'building blocks of matter'?", "Atoms", ["Molecules", "Cells", "Atoms", "Organisms"], "Easy")],
    "Chemistry": [new Question("What is the smallest unit of matter that still retains the properties of an element?", "Atom", ["Molecule", "Compound", "Atom", "Element"], "Easy")]

};


const category = document.querySelectorAll(".category");
const difficultyBox = document.querySelector("#difficultyBox");
const question = document.querySelector("#question")
const opt1 = document.querySelector("#option-1")
const opt2 = document.querySelector("#option-2")
const opt3 = document.querySelector("#option-3")
const opt4 = document.querySelector("#option-4")
const timerSpan = document.querySelector("#timerSpan");

var qNo;
var qSet;
var currQ;
var quizz;
var answered = false;
var maxTime;

function setQuizz(name) {
    difficultyBox.style.display = "flex";
    document.querySelector("#tag").style.display = "none";
    document.querySelector("#container").style.display = "none";
    document.querySelectorAll(".div1")[0].style.display = "none";

    quizz = name;
    for (cat of category) {
        cat.style.display = "none"
    }
    document.querySelector("#quizzName").innerText = quizz;
}

function setTime(level) {
    if (level == "Easy") {
        return 30
    }
    else if (level == "Medium") {
        return 40
    }
    else {
        return 50;
    }
}

function gatherQuestions(quiz, level) {
    maxTime = setTime(level)
    let q = []
    console.log()
    for (each of all[quiz]) {
        if (each.level == level) {
            q.push(each)
        }
    }
    return shuffle(q);
}

function startQuiz(level) {
    calculatorView.style.display = "block";
    difficultyBox.style.display = "none"
    qNo = 0;
    qSet = gatherQuestions(quizz, level)
    setTime(level);
    if (qSet.length == 0) {

        calculatorView.style.display = "none";
        alert("No questions in this difficulty");

        difficultyBox.style.display = "flex"
    }
    else {
        for (each of category) {
            each.style.display = "none";
        }

        currQ = qSet[qNo]
        showQuestion(currQ)
        document.querySelector("#timer").style.display = "flex";

        document.querySelectorAll(".questionBox")[0].style.display = "flex"
    }

}



function showQuestion(q) {
    startTimer()
    question.innerText = "Q. " + q.question;
    opt1.innerText = "(a) " + q.options[0]
    opt2.innerText = "(b) " + q.options[1]
    opt3.innerText = "(c) " + q.options[2]
    opt4.innerText = "(d) " + q.options[3]

}

function checkAnswer(n) {
    alert(`Elapsed time in this question is ${maxTime - time} second(s)`)
    stopTimer()
    answered = true;
    let answer = currQ.answer;
    let userAnswer = currQ.options[n]
    currQ.addAnswer(userAnswer)
    currQ.addTime(maxTime - time);
    if (userAnswer == answer) {
        document.querySelector(`#option-${n + 1}`).style.backgroundColor = "green"
    }
    else {
        document.querySelector(`#option-${n + 1}`).style.backgroundColor = "red";
        document.querySelector(`#option-${currQ.options.indexOf(answer) + 1}`).style.backgroundColor = "green"
    }
}

function nextQuestion() {
    qNo++;
    if (qNo == qSet.length) {
        viewProgress();
    }
    else {
        currQ = qSet[qNo]
        showQuestion(currQ)
        opt1.style.backgroundColor = "white"
        opt2.style.backgroundColor = "white"
        opt3.style.backgroundColor = "white"
        opt4.style.backgroundColor = "white"
        timerSpan.innerText = maxTime;
    }
}

var interval;
var time = maxTime;

function startTimer() {
    time = maxTime;
    interval = setInterval(() => {
        time -= 1;
        timerSpan.innerText = time;
        if (time == 0) {
            stopTimer();
            nextQuestion()
        }
    }, 1000)
}

function stopTimer() {
    clearInterval(interval)
}


function viewProgress() {
    document.querySelector("#progressBar").style.display = "flex";
    document.querySelectorAll(".questionBox")[0].style.display = "none";
    document.querySelector("#timer").style.display = "none";
    let totalQuestion = qSet.length;
    let qCorrect = 0;
    let qUnattempted = 0;
    for (each of qSet) {
        if (each.user == each.answer) {
            qCorrect++;
        }
        if (each.user == "") {
            qUnattempted++;
        }
    }
    let percentage = (qCorrect / totalQuestion) * 100;

    document.querySelector("#totalQuestionSpan").innerText = totalQuestion;
    document.querySelector("#correctAnsweredSpan").innerText = qCorrect;
    document.querySelector("#unattemptedQuestionsSpan").innerText = qUnattempted;
    document.querySelector("#percentageSpan").innerText = percentage;
    let comment = ""
    if (percentage <= 40) {
        comment = "Try Again"
    }
    else if (percentage >= 41 && percentage <= 80) {
        comment = "Good"
    }
    else {
        comment = "Excellent"
    }
    document.querySelector("#commentSpan").innerText = comment;
}

document.querySelector("#back2Home").addEventListener('click', () => {
    location.reload()
})