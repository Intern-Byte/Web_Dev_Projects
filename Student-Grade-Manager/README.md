# Student Grade Manager

A modern, responsive, and single-page web application for managing student grades. Built with vanilla HTML, CSS, and JavaScript, this project provides a clean interface for adding students, tracking their performance across multiple subjects, and viewing overall class statistics. The application uses `localStorage` for persistent data storage, so your data is saved in your browser even after closing the tab.

## ✨ Features

* **Dynamic Two-Step Form:** Easily add a new student by first entering their name, unique roll number, and the number of subjects. The form then dynamically generates fields to enter each subject and its corresponding grade.
* **Comprehensive Student List:** View all students in a clean, responsive table that shows their roll number, name, a detailed list of subjects with grades, and their calculated average grade.
* **Live Class Statistics:** Get instant insights with a dedicated statistics panel displaying:
    * Total number of students.
    * Overall class average.
    * The average score of the top-performing student.
* **Real-time Search:** Instantly filter the student list by searching for a student's name or roll number.
* **Persistent Data:** All student data is saved to the browser's `localStorage`, ensuring that your information is not lost when you refresh or close the page.
* **Data Integrity:** Includes robust validation to ensure that roll numbers are unique and grades are within a valid range (0-100).
* **Legacy Data Migration:** Automatically detects and converts data from previous, outdated formats to the current structure, preventing errors from old `localStorage` entries.
* **Sleek & Responsive Design:** Features a modern dark theme with a visually appealing layout that works seamlessly on all devices, from mobile phones to desktop monitors.

---

## 📂 Project Structure

The project is organized into three separate files for better maintainability and follows standard web development practices:

student-grade-manager/
├── index.html      # The main HTML file for structure and content
├── style.css       # All custom styles for the application
└── script.js       # All the JavaScript logic and interactivity

---

## 💻 Tech Stack

* **HTML5**
* **CSS3** (with custom properties for theme)
* **Tailwind CSS** (via CDN for utility classes)
* **Vanilla JavaScript (ES6+)**
* **Google Fonts** (Poppins)

---

## 🚀 How to Use

1.  **Download the Folder:**
    * Clone this repository or download the `student-grade-manager` folder containing all three files.
2.  **Keep Files Together:**
    * Ensure that `index.html`, `style.css`, and `script.js` are all inside the same `student-grade-manager` folder.
3.  **Open in Browser:**
    * Open the `index.html` file directly in any modern web browser (like Google Chrome, Firefox, or Microsoft Edge).

The application is now ready to use!

---

## 📄 Usage Policy

This project is made by the **InternByte team**. It is for use by InternByte interns only. Do not use for personal purposes or copy without permission.
