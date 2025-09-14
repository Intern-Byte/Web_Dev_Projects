# Interactive Quiz Application

A stylish and dynamic web-based quiz application that fetches questions from a live API. This project is built with vanilla HTML, CSS, and JavaScript, focusing on DOM manipulation, event handling, and API integration.

## 📜 Description

This project is an interactive quiz that presents users with 15 multiple-choice questions fetched from the Open Trivia Database. The application provides immediate visual feedback for correct and incorrect answers, tracks the user's score, and displays the final result at the end. The "Play Again" feature allows for endless replayability with a new set of questions each time.

The primary goal was to build a complete, self-contained web application without relying on any external frameworks, demonstrating core web development skills.

## ✨ Features

- **Dynamic Content:** Fetches 15 new questions and answers from the [Open Trivia Database API](https://opentdb.com/) for every quiz session.
- **Interactive UI:** Clean and modern interface with a glass-morphism effect.
- **Instant Feedback:** Answer buttons immediately turn green for correct and red for incorrect selections.
- **Score Tracking:** The user's score is calculated and displayed at the end of the quiz.
- **Responsive Design:** The layout is optimized for a seamless experience on both desktop and mobile devices.
- **No Frameworks:** Built entirely with vanilla HTML, CSS, and JavaScript.

## 🚀 How to Use

Since this project is self-contained in a single `index.html` file, running it is incredibly simple:

1.  **Clone the repository (or download the files):**
    ```bash
    git clone [https://github.com/Intern-Byte/Web_Dev_Projects](https://github.com/Intern-Byte/Web_Dev_Projects)
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd quiz-application
    ```
3.  **Open the `index.html` file:**
    - Simply double-click the `index.html` file in your file explorer, and it will open in your default web browser.

That's it! The quiz will start automatically.

## 🛠️ Technologies Used

- **HTML5:** For the structure and content of the application.
- **CSS3:** For styling, including the gradient background, responsive layout, and interactive button effects.
- **JavaScript (ES6+):** For all the logic, including:
  - Fetching data from the API using `async/await`.
  - Manipulating the DOM to display questions and answers.
  - Handling user click events.
  - Managing the quiz state (current question, score).

## 💡 Future Improvements

- **Category & Difficulty Selection:** Allow users to choose the category and difficulty of the questions before starting the quiz.
- **Question Timer:** Add a countdown timer for each question to increase the challenge.
- **High Score Board:** Implement `localStorage` to save and display high scores.
- **Animations & Transitions:** Add more fluid animations for question transitions.

## 📄 License

Copyright (c) 2025 Intern Byte

All rights reserved.

This repository and its datasets are provided exclusively for educational use
within the Intern Byte internship program.

You are NOT allowed to:

- Copy, distribute, or publish the datasets outside Intern Byte.
- Use the datasets for commercial purposes.
- Modify or create derivative works based on the datasets.

Access is strictly limited to authorized Intern Byte interns.
Unauthorized use will be considered a violation of copyright.
