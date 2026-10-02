// ==========================================
// INTERVIEWAI - JAVASCRIPT
// ==========================================


// ==========================================
// INTERVIEW QUESTIONS
// ==========================================

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


// ==========================================
// VARIABLES
// ==========================================

let currentQuestion = 0;
let selectedQuestions = [];
let answers = [];

let timeLeft = 60;
let timerInterval = null;


// ==========================================
// OPEN INTERVIEW SECTION
// ==========================================

function openInterview() {

    const interviewSection =
        document.getElementById("interview");

    if (!interviewSection) {
        console.error("Interview section not found.");
        return;
    }

    // Make sure the section is visible
    interviewSection.style.display = "block";

    // Scroll to interview
    interviewSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    // Focus name field
    setTimeout(() => {

        const nameInput =
            document.getElementById("candidateName");

        if (nameInput) {
            nameInput.focus();
        }

    }, 600);
}


// ==========================================
// START INTERVIEW
// ==========================================

function startInterview() {

    const nameInput =
        document.getElementById("candidateName");

    const roleInput =
        document.getElementById("jobRole");

    if (!nameInput || !roleInput) {
        console.error("Interview form elements not found.");
        return;
    }

    const name =
        nameInput.value.trim();

    const role =
        roleInput.value;


    // Check name
    if (name === "") {

        alert("Please enter your name first.");

        nameInput.focus();

        return;
    }


    // Check role
    if (role === "" || !questions[role]) {

        alert("Please select a job role.");

        roleInput.focus();

        return;
    }


    // Reset interview
    selectedQuestions =
        questions[role];

    currentQuestion = 0;

    answers = [];


    // Get screens
    const setupScreen =
        document.getElementById("setupScreen");

    const questionScreen =
        document.getElementById("questionScreen");

    const resultScreen =
        document.getElementById("resultScreen");


    // Show question screen
    setupScreen.style.display = "none";

    questionScreen.style.display = "block";

    resultScreen.style.display = "none";


    // Show first question
    showQuestion();


    // Scroll to question area
    questionScreen.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


// ==========================================
// SHOW QUESTION
// ==========================================

function showQuestion() {

    if (!selectedQuestions.length) {
        return;
    }


    const questionText =
        document.getElementById("questionText");

    const questionNumber =
        document.getElementById("questionNumber");

    const answerBox =
        document.getElementById("answer");

    const progressBar =
        document.getElementById("progressBar");


    // Question
    questionText.textContent =
        selectedQuestions[currentQuestion];


    // Question number
    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${selectedQuestions.length}`;


    // Clear answer box
    answerBox.value = "";


    // Progress
    const progress =
        (currentQuestion /
            selectedQuestions.length) * 100;

    progressBar.style.width =
        progress + "%";


    // Start timer
    startTimer();


    // Focus answer box
    setTimeout(() => {

        answerBox.focus();

    }, 300);
}


// ==========================================
// START TIMER
// ==========================================

function startTimer() {

    clearInterval(timerInterval);

    timeLeft = 60;

    updateTimer();


    timerInterval = setInterval(() => {

        timeLeft--;

        updateTimer();


        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            // Automatically move to next question
            nextQuestion();

        }

    }, 1000);
}


// ==========================================
// UPDATE TIMER
// ==========================================

function updateTimer() {

    const timer =
        document.getElementById("timer");

    if (!timer) {
        return;
    }


    timer.textContent =
        `⏱ ${timeLeft}s`;


    if (timeLeft <= 10) {

        timer.style.color =
            "#ff6b6b";

    } else {

        timer.style.color =
            "#fca5a5";

    }
}


// ==========================================
// SAVE ANSWER
// ==========================================

function saveAnswer() {

    const answerBox =
        document.getElementById("answer");

    if (!answerBox) {
        return;
    }


    answers[currentQuestion] =
        answerBox.value.trim();
}


// ==========================================
// NEXT QUESTION
// ==========================================

function nextQuestion() {

    clearInterval(timerInterval);

    saveAnswer();

    currentQuestion++;


    // Check if interview is finished
    if (
        currentQuestion >=
        selectedQuestions.length
    ) {

        finishInterview();

        return;
    }


    showQuestion();
}


// ==========================================
// SKIP QUESTION
// ==========================================

function skipQuestion() {

    clearInterval(timerInterval);

    // Store empty answer
    answers[currentQuestion] = "";

    currentQuestion++;


    // Check if interview is finished
    if (
        currentQuestion >=
        selectedQuestions.length
    ) {

        finishInterview();

        return;
    }


    showQuestion();
}


// ==========================================
// FINISH INTERVIEW
// ==========================================

function finishInterview() {

    clearInterval(timerInterval);


    const questionScreen =
        document.getElementById("questionScreen");

    const resultScreen =
        document.getElementById("resultScreen");

    const progressBar =
        document.getElementById("progressBar");


    questionScreen.style.display =
        "none";

    resultScreen.style.display =
        "block";

    progressBar.style.width =
        "100%";


    // Calculate score
    const score =
        calculateScore();


    document.getElementById("score")
        .textContent =
        score + "%";


    let title;
    let message;


    if (score >= 80) {

        title =
            "Excellent Performance! 🚀";

        message =
            "Excellent work! Your answers show strong preparation and good communication.";

    }

    else if (score >= 60) {

        title =
            "Good Performance! 👍";

        message =
            "Good job! You have a solid foundation. Try adding more examples and details.";

    }

    else if (score >= 40) {

        title =
            "Good Start! 💪";

        message =
            "You are on the right track. Practice explaining your answers more clearly.";

    }

    else {

        title =
            "Keep Practicing! 📚";

        message =
            "Keep practicing. Review the questions and try the simulator again.";

    }


    document.getElementById("resultTitle")
        .textContent =
        title;

    document.getElementById("feedback")
        .textContent =
        message;


    // Scroll to result
    resultScreen.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


// ==========================================
// CALCULATE SCORE
// ==========================================

function calculateScore() {

    let total = 0;


    answers.forEach(answer => {

        if (!answer) {
            return;
        }


        const length =
            answer.length;


        if (length >= 150) {

            total += 20;

        }

        else if (length >= 100) {

            total += 17;

        }

        else if (length >= 70) {

            total += 14;

        }

        else if (length >= 40) {

            total += 10;

        }

        else if (length >= 20) {

            total += 6;

        }

        else {

            total += 3;

        }

    });


    const maximum =
        selectedQuestions.length * 20;


    if (maximum === 0) {
        return 0;
    }


    return Math.min(
        100,
        Math.round(
            (total / maximum) * 100
        )
    );
}


// ==========================================
// RESTART INTERVIEW
// ==========================================

function restartInterview() {

    clearInterval(timerInterval);


    // Reset variables
    currentQuestion = 0;

    selectedQuestions = [];

    answers = [];

    timeLeft = 60;


    // Get screens
    const setupScreen =
        document.getElementById("setupScreen");

    const questionScreen =
        document.getElementById("questionScreen");

    const resultScreen =
        document.getElementById("resultScreen");


    // Show setup
    setupScreen.style.display =
        "block";

    questionScreen.style.display =
        "none";

    resultScreen.style.display =
        "none";


    // Reset progress
    const progressBar =
        document.getElementById("progressBar");

    if (progressBar) {

        progressBar.style.width =
            "0%";

    }


    // Reset timer
    const timer =
        document.getElementById("timer");

    if (timer) {

        timer.textContent =
            "⏱ 60s";

    }


    // Clear fields
    const nameInput =
        document.getElementById("candidateName");

    const answerBox =
        document.getElementById("answer");

    if (nameInput) {
        nameInput.value = "";
    }

    if (answerBox) {
        answerBox.value = "";
    }


    // Scroll back to setup
    setupScreen.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });


    setTimeout(() => {

        if (nameInput) {
            nameInput.focus();
        }

    }, 500);
}


// ==========================================
// CONTACT FORM
// ==========================================

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
        !name ||
        !email ||
        !message
    ) {

        alert(
            "Please fill in all fields."
        );

        return;
    }


    alert(
        `Thank you, ${name}! Your message has been received.`
    );


    form.reset();
}


// ==========================================
// KEYBOARD SHORTCUT
// Ctrl + Enter = Next Question
// ==========================================

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.ctrlKey &&
            event.key === "Enter" &&
            selectedQuestions.length > 0
        ) {

            event.preventDefault();

            nextQuestion();

        }

    }
);


// ==========================================
// MOBILE NAVIGATION
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const hamburger =
            document.getElementById("hamburger");

        const navLinks =
            document.getElementById("navLinks");


        if (
            !hamburger ||
            !navLinks
        ) {
            return;
        }


        hamburger.addEventListener(
            "click",
            function() {

                navLinks.classList.toggle(
                    "active"
                );

            }
        );


        // Close menu after clicking a link
        const links =
            navLinks.querySelectorAll("a");


        links.forEach(link => {

            link.addEventListener(
                "click",
                function() {

                    navLinks.classList.remove(
                        "active"
                    );

                }
            );

        });

    }
);


// ==========================================
// CHECK JAVASCRIPT
// ==========================================

console.log(
    "InterviewAI JavaScript loaded successfully."
);
