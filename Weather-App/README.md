# Intern Byte Weather App

A stylish and responsive weather application built with vanilla HTML, CSS, and JavaScript. This app fetches and displays real-time weather data for any city using the Google Gemini API.

## Features

-   **City Search:** Get current weather conditions for any city in the world.
-   **Dynamic Data Display:** Shows current temperature, weather condition (e.g., "Clear sky"), humidity, and wind speed.
-   **Responsive UI:** The design adapts gracefully to different screen sizes, from mobile to desktop.
-   **Engaging User Experience:** Includes a loading state while fetching data and clear error messages for invalid city names or API issues.
-   **Themed Icons:** Weather conditions are represented by custom SVG icons.

## Setup and Usage

To run this project, you need a Google Gemini API key.

1.  **Get an API Key**
    -   Obtain a free API key from Google AI Studio.

2.  **API Key Configuration**
    -   Open the `script.js` file in a text editor.
    -   Find the line: `const API_KEY = "YOUR_API_KEY_HERE";`
    -   Replace `"YOUR_API_KEY_HERE"` with your actual Google Gemini API key.

3.  **Running the Application**
    -   After adding your API key, simply open the `index.html` file in a modern web browser.

## Project Structure

-   `index.html`: The main HTML file containing the structure of the web page.
-   `style.css`: The stylesheet responsible for the application's appearance, including the responsive design and animations.
-   `script.js`: The core JavaScript file that handles user input, fetches data from the Gemini API, and dynamically updates the HTML to display the weather information.