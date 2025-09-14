# Simple Recipe Finder - IB

A simple, responsive web application that allows users to search for recipes by ingredient. Clicking on a recipe reveals detailed instructions, an ingredients list, and a video tutorial if available.

## How It Works

1.  **Enter an Ingredient**: Type any ingredient (e.g., "chicken," "eggs," "tofu") into the search bar at the top of the page.
2.  **Search for Recipes**: Click the "Search" button or press Enter. The application will fetch and display all matching recipes in a visually appealing grid.
3.  **View Recipe Details**: Click on any recipe card that interests you. A modal window will appear, showing you:
    - The recipe's name and image.
    - A complete list of ingredients and their measurements.
    - Step-by-step cooking instructions.
    - An embedded YouTube video tutorial, if one is available for that recipe.
4.  **Close and Explore More**: Close the modal by clicking the '×' button, pressing the `Esc` key, or clicking outside the details box. You can then continue to explore other recipes from your search or perform a new search.

## API Used

This application is powered by **TheMealDB API**, a free, crowd-sourced database of recipes from around the world.

-   **Website**: [https://www.themealdb.com/](https://www.themealdb.com/)
-   **Endpoints Used**:
    -   `filter.php?i={ingredient}`: To search for meals by main ingredient.
    -   `lookup.php?i={meal-id}`: To fetch the full details for a specific meal.

All content and images are provided by TheMealDB API.
