/* =====================================================
   INTERVIEW AI - MAIN JAVASCRIPT
   ===================================================== */


/* =====================================================
   INTERVIEW QUESTIONS
   ===================================================== */

const questions = {

    frontend: [
        "What is the difference between HTML, CSS and JavaScript?",
        "What is the DOM and how does JavaScript interact with it?",
        "What is responsive web design?",
        "Explain the difference between Flexbox and CSS Grid.",
        "What are semantic HTML elements?"
    ],

    backend: [
        "What is a REST API?",
        "What is the difference between SQL and NoSQL databases?",
        "What is authentication and authorization?",
        "What is server-side programming?",
        "Explain what an API endpoint is."
    ],

    data: [
        "What is the difference between mean, median and mode?",
        "What is data cleaning?",
        "What is SQL and why is it used?",
        "What is data visualization?",
        "What is the difference between correlation and causation?"
    ],

    software: [
        "What is object-oriented programming?",
        "What is version control?",
        "What is Git and why is it useful?",
        "What is the software development life cycle?",
        "What is debugging?"
    ],

    hr: [
        "Tell me about yourself.",
        "Why do you want to work with our company?",
        "What are your strengths?",
        "How do you handle conflict?",
        "Where do you see yourself in five years?"
    ],

    marketing: [
        "What is digital marketing?",
        "What is SEO?",
        "What is social media marketing?",
        "How would you promote a new product?",
        "What is a target audience?"
    ]

};


/* =====================================================
   VARIABLES
   ===================================================== */

let currentQuestion = 0;

let selectedQuestions = [];

let answers = [];

let timeLeft = 60;

let timerInterval = null;


/* =====================================================
   GET HTML ELEMENTS
   ===================================================== */

const setupScreen =
    document.getElementById("setupScreen");

const questionScreen =
    document.getElementById("questionScreen");

const resultScreen =
    document.getElementById("resultScreen");

const candidateName =
    document.getElementById("candidateName");

const jobRole =
    document.getElementById("jobRole");

const experience =
    document.getElementById("experience");

const questionNumber =
    document.getElementById("questionNumber");

const questionText =
    document.getElementById("questionText");

const answerBox =
    document.getElementById("answer");

const timer =
    document.getElementById("timer");

const progressBar =
    document.getElementById("progressBar");

const scoreElement =
    document.getElementById("score");

const resultTitle =
    document.getElementById("resultTitle");

const feedback =
    document.getElementById("feedback");


/* =====================================================
   START INTERVIEW
   ===================================================== */

function startInterview() {

    const name = candidateName.value.trim();

    if (name === "") {

        alert("Please enter your name.");

        candidateName.focus();

        return;

    }


    const role = jobRole.value;

    selectedQuestions = questions[role];

    currentQuestion = 0;

    answers = [];


    setupScreen.style.display = "none";

    questionScreen.style.display = "block";

    resultScreen.style.display = "none";


    showQuestion();


    // Scroll to interview section
    document.getElementById("interview").scrollIntoView({
        behavior: "smooth"
    });

}


/* =====================================================
   SHOW QUESTION
   ===================================================== */

function showQuestion() {

    if (
        !selectedQuestions ||
        selectedQuestions.length === 0
    ) {

        alert("No questions available.");

        return;

    }


    const question =
        selectedQuestions[currentQuestion];


    questionNumber.textContent =
        "Question " +
        (currentQuestion + 1) +
        " of " +
        selectedQuestions.length;


    questionText.textContent = question;


    answerBox.value = "";


    const progress =
        (currentQuestion /
        selectedQuestions.length) * 100;


    progressBar.style.width =
        progress + "%";


    startTimer();


    // Automatically place cursor inside answer box
    setTimeout(() => {
        answerBox.focus();
    }, 200);

}


/* =====================================================
   TIMER
   ===================================================== */

function startTimer() {

    clearInterval(timerInterval);


    timeLeft = 60;


    timer.textContent =
        "⏱ " + timeLeft + "s";


    timerInterval = setInterval(() => {

        timeLeft--;


        timer.textContent =
            "⏱ " + timeLeft + "s";


        // Change timer appearance when time is low
        if (timeLeft <= 10) {

            timer.style.color = "#f87171";

        } else {

            timer.style.color = "#fca5a5";

        }


        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            timer.textContent = "⏱ Time's Up!";

            setTimeout(() => {

                nextQuestion();

            }, 500);

        }

    }, 1000);

}


/* =====================================================
   SAVE CURRENT ANSWER
   ===================================================== */

function saveCurrentAnswer() {

    const answer =
        answerBox.value.trim();


    answers[currentQuestion] =
        answer;

}


/* =====================================================
   NEXT QUESTION
   ===================================================== */

function nextQuestion() {

    clearInterval(timerInterval);


    saveCurrentAnswer();


    currentQuestion++;


    if (
        currentQuestion >=
        selectedQuestions.length
    ) {

        finishInterview();

        return;

    }


    showQuestion();

}


/* =====================================================
   SKIP QUESTION
   ===================================================== */

function skipQuestion() {

    clearInterval(timerInterval);


    // Store empty answer for skipped question
    answers[currentQuestion] = "";


    currentQuestion++;


    if (
        currentQuestion >=
        selectedQuestions.length
    ) {

        finishInterview();

        return;

    }


    showQuestion();

}


/* =====================================================
   FINISH INTERVIEW
   ===================================================== */

function finishInterview() {

    clearInterval(timerInterval);


    // Make progress complete
    progressBar.style.width = "100%";


    questionScreen.style.display =
        "none";


    resultScreen.style.display =
        "block";


    const finalScore =
        calculateScore();


    scoreElement.textContent =
        finalScore + "%";


    let title;

    let message;


    if (finalScore >= 80) {

        title =
            "Excellent Performance! 🚀";

        message =
            "Excellent work! Your answers show strong preparation and good communication. Keep practicing to become even more confident.";

    }

    else if (finalScore >= 60) {

        title =
            "Good Performance! 👍";

        message =
            "Good job! You have a solid foundation. Try adding more examples and details to make your answers stronger.";

    }

    else if (finalScore >= 40) {

        title =
            "Good Start! 💪";

        message =
            "You are on the right track. Practice explaining your answers clearly and try to include more relevant details.";

    }

    else {

        title =
            "Keep Practicing! 📚";

        message =
            "Don't worry. Interview skills improve with practice. Review the questions and try the simulator again.";

    }


    resultTitle.textContent =
        title;


    feedback.textContent =
        message;


    // Scroll to results
    resultScreen.scrollIntoView({
        behavior: "smooth"
    });

}


/* =====================================================
   CALCULATE SCORE
   ===================================================== */

function calculateScore() {

    let totalScore = 0;


    answers.forEach(answer => {

        if (!answer) {

            return;

        }


        const length =
            answer.length;


        if (length >= 150) {

            totalScore += 20;

        }

        else if (length >= 100) {

            totalScore += 17;

        }

        else if (length >= 70) {

            totalScore += 14;

        }

        else if (length >= 40) {

            totalScore += 10;

        }

        else if (length >= 20) {

            totalScore += 6;

        }

        else {

            totalScore += 3;

        }

    });


    const maximumScore =
        selectedQuestions.length * 20;


    if (maximumScore === 0) {

        return 0;

    }


    return Math.min(
        100,
        Math.round(
            (totalScore /
            maximumScore) * 100
        )
    );

}


/* =====================================================
   RESTART INTERVIEW
   ===================================================== */

function restartInterview() {

    clearInterval(timerInterval);


    currentQuestion = 0;

    answers = [];

    selectedQuestions = [];


    resultScreen.style.display =
        "none";


    questionScreen.style.display =
        "none";


    setupScreen.style.display =
        "block";


    progressBar.style.width =
        "0%";


    timer.textContent =
        "⏱ 60s";


    candidateName.value =
        "";


    answerBox.value =
        "";


    candidateName.focus();


    document.getElementById("interview").scrollIntoView({
        behavior: "smooth"
    });

}


/* =====================================================
   CONTACT FORM
   ===================================================== */

function sendMessage(event) {

    event.preventDefault();


    const form =
        event.target;


    const name =
        form.querySelector(
            'input[type="text"]'
        ).value.trim();


    const email =
        form.querySelector(
            'input[type="email"]'
        ).value.trim();


    const message =
        form.querySelector(
            "textarea"
        ).value.trim();


    if (
        name === "" ||
        email === "" ||
        message === ""
    ) {

        alert(
            "Please fill in all fields."
        );

        return;

    }


    alert(
        "Thank you, " +
        name +
        "! Your message has been received."
    );


    form.reset();

}


/* =====================================================
   NAVIGATION BUTTONS
   ===================================================== */

// Smooth scrolling for all internal links

document.querySelectorAll(
    'a[href^="#"]'
).forEach(link => {

    link.addEventListener(
        "click",
        function(event) {

            const targetId =
                this.getAttribute("href");


            if (
                targetId === "#" ||
                targetId === ""
            ) {

                return;

            }


            const target =
                document.querySelector(
                    targetId
                );


            if (target) {

                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }
    );

});


/* =====================================================
   KEYBOARD SHORTCUTS
   ===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        // Ctrl + Enter = Next Question

        if (
            event.ctrlKey &&
            event.key === "Enter" &&
            questionScreen.style.display !== "none"
        ) {

            event.preventDefault();

            nextQuestion();

        }

    }
);


/* =====================================================
   PAGE LOAD
   ===================================================== */

window.addEventListener(
    "load",
    function() {

        // Make sure correct initial state is shown

        setupScreen.style.display =
            "block";

        questionScreen.style.display =
            "none";

        resultScreen.style.display =
            "none";

    }
);
