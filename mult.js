let wrong = [];
let numToPractice = 0;
let numList = [];
let currentTest = 0;
let correctAnswers = 0;
let initialMissed = 0;
let lastMessage = ""; // Track the last feedback message
const correctMessages = ["Good job!", "Right!", "Yep!", "Nailed it.", "Spot on!", "Bingo!", "Crushed it.", "Totally!", "Perfecto!", "You are killing it.", "Genius!", "Fantastic!", "You rock!", "Awesome!", "Niiiiiiiice!", "Yaaaasssss!", "So. Dang. Smart."];
const incorrectMessages = ["Nope", "Sorry, that's not it", "Maybe next time", "No. Focus!", "Hmmm, no.", "Uuuuuuh, no.", "Ew, no!.", "Nasty! No way."];

// Set focus on the input when the page loads
window.onload = function() {
    document.getElementById("numInput").focus();
};

// Start practice function
function startPractice() {
    const input = document.getElementById("numInput").value;
    document.getElementById("feedback").textContent = ""; // Clear feedback
    document.getElementById("summary").textContent = ""; // Clear summary

    const intIn = parseInt(input);
    if (isNaN(intIn)) {
        document.getElementById("feedback").textContent = "Please enter a valid number.";
        return;
    }

    numToPractice = intIn;
    numList = Array.from({length: 12}, (_, i) => i + 1); // list from 1 to 12
    correctAnswers = 0;
    initialMissed = 0;
    wrong = [];

    document.getElementById("answerInput").style.display = "inline";
    document.getElementById("submitAnswerBtn").style.display = "inline";
    document.getElementById("answerInput").focus(); // Focus the input field after the practice starts
    askQuestion();
}

// Ask the next question
function askQuestion() {
    if (numList.length > 0) {
        const randomIndex = Math.floor(Math.random() * numList.length);
        currentTest = numList.splice(randomIndex, 1)[0]; // Get random number from list
        document.getElementById("question").textContent = `${currentTest} x ${numToPractice} =`;
        document.getElementById("answerInput").focus(); // Ensure the cursor is in the answer input field
    } else if (wrong.length > 0) {
        currentTest = wrong.pop();
        document.getElementById("question").textContent = `Retry: ${currentTest} x ${numToPractice} =`;
        document.getElementById("answerInput").focus();
    } else {
        endPractice();
    }
}

// Handle submission of answers
function submitAnswer() {
    const answer = parseInt(document.getElementById("answerInput").value);
    
    if (isNaN(answer)) {
        document.getElementById("feedback").textContent = "Please enter a valid number.";
        return;
    }

    const feedbackElement = document.getElementById("feedback");

    if (answer === currentTest * numToPractice) {
        const message = randomMessage(correctMessages);
        feedbackElement.textContent = message;
        feedbackElement.style.color = "#32CD32";  // Brighter lime green for correct
        feedbackElement.style.fontWeight = "bold"; // Bold font for correct
        lastMessage = message;
        correctAnswers++;
    } else {
        const message = randomMessage(incorrectMessages);
        feedbackElement.textContent = message;
        feedbackElement.style.color = "red";   // Incorrect answer in red
        feedbackElement.style.fontWeight = "bold"; // Bold font for incorrect
        lastMessage = message;
        wrong.push(currentTest);
        if (numList.length > 0) initialMissed++; // Only count initial missed
    }

    document.getElementById("answerInput").value = ""; // Clear input for next question
    askQuestion();
}

// Get random message ensuring it's not repeated
function randomMessage(arr) {
    let message;
    do {
        message = arr[Math.floor(Math.random() * arr.length)];
    } while (message === lastMessage); // Prevent repeating the same message twice in a row
    return message;
}

// End practice session and show summary
function endPractice() {
    document.getElementById("question").textContent = "";
    document.getElementById("answerInput").style.display = "none";
    document.getElementById("submitAnswerBtn").style.display = "none";

    if (initialMissed === 0) {
        document.getElementById("summary").textContent = `Wow, 100%! You got them all right on the first try!`;
    } else {
        document.getElementById("summary").textContent = `You got them all! This time you missed ${initialMissed}.`;
    }
}

// Allow the "Enter" key to start practice
document.getElementById("numInput").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        startPractice();
    }
});

// Allow the "Enter" key to submit the answer
document.getElementById("answerInput").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        submitAnswer();
    }
});