// --- DOM Element References ---
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

// --- Application State ---
let questions = []; // Will be populated from the API
let currentQuestionIndex = 0;
let score = 0;

/**
 * Decodes HTML entities (e.g., &quot;) from the API response.
 * @param {string} html The string to decode.
 * @returns {string} The decoded string.
 */
function decodeHtml(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

/**
 * Fetches questions from the API and starts the quiz.
 */
async function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  resetState();
  questionElement.innerHTML = "Loading questions...";
  answerButtons.innerHTML = ""; // Clear old answers while loading
  nextButton.style.display = "none";

  try {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=15&type=multiple"
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();

    if (data.results.length === 0) {
      throw new Error("Could not fetch questions, please try again.");
    }

    // Format API data into the structure our app uses
    questions = data.results.map((apiQuestion) => {
      const correctAnswer = apiQuestion.correct_answer;
      const incorrectAnswers = apiQuestion.incorrect_answers;
      const allAnswers = [...incorrectAnswers, correctAnswer];

      // Shuffle the answers so the correct one isn't always last
      const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

      return {
        question: decodeHtml(apiQuestion.question),
        answers: shuffledAnswers.map((answer) => ({
          text: decodeHtml(answer),
          correct: answer === correctAnswer,
        })),
      };
    });

    showQuestion();
  } catch (error) {
    console.error("Quiz Error:", error);
    questionElement.innerHTML = `Failed to load questions. <br> Please try again!`;
    nextButton.innerHTML = "Try Again";
    nextButton.style.display = "block";
  }
}

/**
 * Displays the current question and its answer options.
 */
function showQuestion() {
  resetState();
  if (questions.length === 0 || currentQuestionIndex >= questions.length) {
    // This case should not be hit if API call is successful
    questionElement.innerHTML = "No questions loaded.";
    return;
  }
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = "true";
    }
    button.addEventListener("click", selectAnswer);
  });
}

/**
 * Resets the UI for the next question.
 */
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

/**
 * Handles the user's answer selection.
 * @param {Event} e The click event object.
 */
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  // Provide visual feedback
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++; // Increment score if correct
  } else {
    selectedBtn.classList.add("incorrect");
  }

  // Show correct answer and disable all buttons
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

/**
 * Displays the final score at the end of the quiz.
 */
function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

/**
 * Handles the logic for the "Next" button.
 */
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

// --- Event Listeners ---
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz(); // If at the end or on error, restart the quiz
  }
});

// --- Start the Quiz ---
startQuiz();
