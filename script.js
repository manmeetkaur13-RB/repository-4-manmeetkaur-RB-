// ===============================
// INTERVIEW QUESTIONS
// ===============================

const questions = {
    "Frontend Developer": [
        "Tell me about yourself.",
        "What is the difference between HTML, CSS and JavaScript?",
        "What is the DOM in JavaScript?",
        "What is responsive web design?",
        "Why should we hire you as a frontend developer?"
    ],

    "Backend Developer": [
        "Tell me about yourself.",
        "What is an API?",
        "What is the difference between SQL and NoSQL?",
        "Explain authentication and authorization.",
        "Why should we hire you?"
    ],

    "Data Analyst": [
        "Tell me about yourself.",
        "What is the difference between SQL and Excel?",
        "What is data cleaning?",
        "Which data visualization tools have you used?",
        "Why should we hire you as a data analyst?"
    ],

    "Software Developer": [
        "Tell me about yourself.",
        "What programming languages do you know?",
        "Explain object-oriented programming.",
        "What is version control?",
        "Why should we hire you?"
    ],

    "HR": [
        "Tell me about yourself.",
        "How would you handle a conflict between employees?",
        "What makes a good team member?",
        "How do you handle pressure?",
        "Why should we hire you?"
    ],

    "Marketing": [
        "Tell me about yourself.",
        "What is digital marketing?",
        "How would you promote a new product?",
        "What is SEO?",
        "Why should we hire you?"
    ]
};


// ===============================
// VARIABLES
// ===============================

let currentQuestion = 0;
let selectedQuestions = [];
let answers = [];

let timeLeft = 60;
let timerInterval;


// ===============================
// START INTERVIEW
// ===============================

function startInterview() {

    const name = document
        .getElementById("candidateName")
        .value
        .trim();

    const role = document
        .getElementById("jobRole")
        .value;

    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    selectedQuestions = questions[role];

    currentQuestion = 0;
    answers = [];

    document.getElementById("setupScreen").style.display = "none";

    document.getElementById("interviewScreen").style.display = "block";

    document.getElementById("candidateInfo").innerText =
        `${name} • ${role}`;

    showQuestion();
}


// ===============================
// DISPLAY QUESTION
// ===============================

function showQuestion() {

    const questionElement =
        document.getElementById("question");

    const questionNumber =
        document.getElementById("questionNumber");

    const percentage =
        document.getElementById("percentage");

    const progressFill =
        document.getElementById("progressFill");

    const answer =
        document.getElementById("answer");


    // Display current question
    questionElement.innerText =
        selectedQuestions[currentQuestion];


    // Question number
    questionNumber.innerText =
        `Question ${currentQuestion + 1} of ${selectedQuestions.length}`;


    // Calculate progress
    const progress =
        ((currentQuestion + 1) /
        selectedQuestions.length) * 100;


    percentage.innerText =
        `${Math.round(progress)}%`;


    progressFill.style.width =
        `${progress}%`;


    // Clear previous answer
    answer.value = "";


    // Start timer
    startTimer();
}


// ===============================
// TIMER
// ===============================

function startTimer() {

    clearInterval(timerInterval);

    timeLeft = 60;

    document.getElementById("timer").innerText =
        timeLeft;


    timerInterval = setInterval(() => {

        timeLeft--;

        document.getElementById("timer").innerText =
            timeLeft;


        // Time finished
        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            nextQuestion();
        }

    }, 1000);
}


// ===============================
// NEXT QUESTION
// ===============================

function nextQuestion() {

    clearInterval(timerInterval);


    const answer =
        document
            .getElementById("answer")
            .value
            .trim();


    // Save answer
    answers.push(answer);


    currentQuestion++;


    // Check if interview finished
    if (currentQuestion >= selectedQuestions.length) {

        finishInterview();

    } else {

        showQuestion();
    }
}


// ===============================
// SKIP QUESTION
// ===============================

function skipQuestion() {

    clearInterval(timerInterval);

    // Store empty answer
    answers.push("");

    currentQuestion++;


    if (currentQuestion >= selectedQuestions.length) {

        finishInterview();

    } else {

        showQuestion();
    }
}


// ===============================
// FINISH INTERVIEW
// ===============================

function finishInterview() {

    clearInterval(timerInterval);


    document.getElementById("interviewScreen")
        .style.display = "none";


    document.getElementById("resultScreen")
        .style.display = "block";


    const name =
        document
            .getElementById("candidateName")
            .value;


    document.getElementById("resultGreeting")
        .innerText =
        `Great job, ${name}! Here is your interview result.`;


    calculateScore();
}


// ===============================
// CALCULATE SCORE
// ===============================

function calculateScore() {

    let answeredQuestions = 0;


    answers.forEach(answer => {

        // Consider an answer valid
        // if it contains more than 20 characters

        if (answer.length >= 20) {

            answeredQuestions++;
        }

    });


    let score =
        Math.round(
            (answeredQuestions /
            selectedQuestions.length) * 100
        );


    document.getElementById("score")
        .innerText = `${score}%`;


    // ===========================
    // EXCELLENT
    // ===========================

    if (score >= 80) {

        document.getElementById("communication")
            .innerText = "Excellent";

        document.getElementById("confidence")
            .innerText = "Excellent";

        document.getElementById("quality")
            .innerText = "Excellent";

        document.getElementById("overall")
            .innerText =
            "Excellent preparation! Your answers show good effort and consistency.";
    }


    // ===========================
    // GOOD
    // ===========================

    else if (score >= 50) {

        document.getElementById("communication")
            .innerText = "Good";

        document.getElementById("confidence")
            .innerText = "Good";

        document.getElementById("quality")
            .innerText = "Average";

        document.getElementById("overall")
            .innerText =
            "Good start. Try giving more detailed and structured answers.";
    }


    // ===========================
    // NEEDS IMPROVEMENT
    // ===========================

    else {

        document.getElementById("communication")
            .innerText = "Needs Improvement";

        document.getElementById("confidence")
            .innerText = "Needs Improvement";

        document.getElementById("quality")
            .innerText = "Needs Improvement";

        document.getElementById("overall")
            .innerText =
            "Keep practicing. Try giving clear, detailed answers to each question.";
    }
}


// ===============================
// RESTART INTERVIEW
// ===============================

function restartInterview() {

    clearInterval(timerInterval);

    currentQuestion = 0;

    answers = [];

    selectedQuestions = [];


    document.getElementById("resultScreen")
        .style.display = "none";


    document.getElementById("interviewScreen")
        .style.display = "none";


    document.getElementById("setupScreen")
        .style.display = "block";


    document.getElementById("candidateName")
        .value = "";
}


// ===============================
// ENTER KEY SUPPORT
// ===============================

document.addEventListener("keydown", function(event) {

    // Ctrl + Enter = next question

    if (event.ctrlKey && event.key === "Enter") {

        const interviewScreen =
            document.getElementById("interviewScreen");


        if (interviewScreen.style.display === "block") {

            nextQuestion();
        }
    }

});
