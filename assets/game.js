const choices = Array.from(document.querySelectorAll('#choice-text'));
const progressText = document.querySelector('#score');

let currentQuestion = []
let acceptedAnswers = true
let score = 0 
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "The _______ method of an Array object adds and/or removes elements from an array.",
        choice0: "A. Splice",
        choice1: "B. Slice",
        choice2: "C. Shift",
        choice3: "D. Reverse",
        answer: "A. Splice",
    },
    {
        question: "Using _______ statement is how you test for a specific condition.",
        choice0: "A. Select",
        choice1: "B. For",
        choice2: "C. Switch",
        choice3: "D. If",
        answer: "D. If",
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choice0: "A. <js>",
        choice1: "B. <javascript>",
        choice2: "C. <script>",
        choice3: "D. <scripting>",
        answer: "C. <script>",
    },
    {
        question: "Which of the following can't be done with client-side JavaScript?",
        choice0: "A. Validating a form",
        choice1: "B. Sending a form's contents by email",
        choice2: "C. Storing the form's contents to a database file on the server",
        choice3: "D. None of the above",
        answer: "C. Storing the form's contents to a database file on the server",
    },
    {
        question: "______ JavaScript is also called client-side JavaScript.",
        choice0: "A. Microsoft",
        choice1: "B. Navigator",
        choice2: "C. LiveWire",
        choice3: "D. Native",
        answer: "B. Navigator",
    },
    {
        question: "In JavaScript, _________ is an object of the target language data type that encloses an object of the source language.",
        choice0: "A. a wrapper",
        choice1: "B. a link",
        choice2: "C. a cursor",
        choice3: "D. a form",
        answer: "A. a wrapper"
    },
];


const  SCORE_POINTS = 10
const MAX_QUESTIONS = 6

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    console.log(availableQuestions);  // this works
    getNewQuestion()
}

getNewQuestion = () => {
    availableQuestions = [...questions]
    console.log(availableQuestions.length)
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        console.log(availableQuestions); 
        localStorage.setItem('mostRecentScore', score)

        window.location.href = 'end.html';
    }

    questionCounter++

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    console.log(questionsIndex)
    currentQuestion = availableQuestions[questionsIndex]
    console.log(currentQuestion)
    console.log(currentQuestion.question)
    // var questionEl = document.querySelector('#question');
    var quizEl = document.getElementById('quiz');
    console.log(quizEl);
    var titleEl = document.getElementById('questionID');
    titleEl.textContent = currentQuestion.question;
    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptedAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptedAnswers) return

        acceptedAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()