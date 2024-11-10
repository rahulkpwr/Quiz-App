const questions = [
{
    questions: "Which is largest animal in the world?",
    answers: [
        {text: "Shark", correct:false},
        {text: "Blue whale", correct:true},
        {text: "Elephant", correct:false},
        {text: "Giraffe", correct:false}
    ]
},
{
    questions: "Which is the smallest continent in the world?",
    answers: [
        {text: "Asia", correct:false},
        {text: "Australia", correct:true},
        {text: "Arctic", correct:false},
        {text: "Africa", correct:false}
    ]
},
{
    questions: "Who is the number one battsman in the world?",
    answers: [
        {text: "ABdevellers", correct:false},
        {text: "Virat kohli", correct:true},
        {text: "Rohit Sharma", correct:false},
        {text: "Pat cummins", correct:false}
    ]
},
{
    questions: "Who is the number one footballer in world?",
    answers: [
        {text: "Messi", correct:false},
        {text: "Cristiano Ronaldo", correct:true},
        {text: "Nyamar", correct:false},
        {text: "Mbappe", correct:false}
    ]
},
{
    questions: "Which is  the capital of karnataka?",
    answers: [
        {text: "Bidar", correct:false},
        {text: "Bijapure", correct:true},
        {text: "kolar", correct:false},
        {text: "koppal", correct:false}
    ]
},
{
    questions: "Which is capital of India?",
    answers: [
        {text: "Behar", correct:false},
        {text: "New Dehli", correct:true},
        {text: "Banglore", correct:false},
        {text: "Mumbai", correct:false}
    ]
}  
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButtons = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButtons.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQustions = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQustions.questions;

    currentQustions.answers.forEach(answers => {
        const button = document.createElement("button");
        button.innerHTML = answers.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answers.correct){
            button.dataset.correct = answers.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState() {
    nextButtons.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButtons.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButtons.innerHTML = "Play Again";
    nextButtons.style.display = "block";
}

function handleNextButtons(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButtons.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButtons();
    }else{
        startQuiz();
    }
});

startQuiz();
