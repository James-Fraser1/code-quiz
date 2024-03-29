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
    quizEl.innerHTML = "";
    // quizEl.appendChild(titleEl);
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