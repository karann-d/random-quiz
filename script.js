let correctAnswer = "";
let quizBox = document.querySelector(".content");
let userAnswer = document.querySelector("#quizAnswer");
let answerSubmit = document.querySelector("#submit");
let message = document.querySelector("#message");
let newQuiz = document.querySelector("#newQuiz");

function loadQuestion() {
    fetch("https://the-trivia-api.com/api/questions?categories=science&limit=1&difficulty=easy")
        .then((response) => response.json())
        .then((data) => {
            quizBox.textContent = data[0].question;
            correctAnswer = data[0].correctAnswer.toLowerCase();
            message.textContent = "Type your answer and submit";
            userAnswer.value = "";
        })
        .catch((error) => {
            console.log(error);
        });
}

// Load new question on "New Quiz"
// newQuiz.addEventListener("click", function () {
//     loadQuestion();
// });

// Submit answer
answerSubmit.addEventListener("click", function (e) {
    e.preventDefault()
    let typedAnswer = userAnswer.value.trim().toLowerCase();

    if (!typedAnswer) {
        message.textContent = "Please enter your answer";
        setTimeout(() => {
            message.textContent = "";
        }, 5000);
    } else if (typedAnswer === correctAnswer) {
        message.textContent = `🎉 Correct! The answer is: ${correctAnswer}`;
        message.style.color = "green";
        setTimeout(() => {
            message.textContent = "";
            message.style.color = "black";

            loadQuestion()
        }, 5000);
    } else {
        message.textContent = `❌ Wrong! The correct answer is: ${correctAnswer}`;
        message.style.color = "red";
        setTimeout(() => {
            message.textContent = "";
            message.style.color = "black";

            loadQuestion()
        }, 5000);
    }
});

// Load first question
loadQuestion();
