document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // --- DOM Element Selection ---
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const resultsGrid = document.getElementById('recipe-results');
    const messageContainer = document.getElementById('message-container');
    const loader = document.getElementById('loader');
    const modal = document.getElementById('recipe-modal');
    const modalBody = document.getElementById('modal-body');
    const initialMessage = document.getElementById('initial-message');

    const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

    // --- State Management Functions ---
    const showLoader = () => loader.classList.remove('hidden');
    const hideLoader = () => loader.classList.add('hidden');
    
    const showMessage = (message, isError = false) => {
        messageContainer.innerHTML = `<p class="${isError ? 'error-message' : ''}">${message}</p>`;
        messageContainer.classList.remove('hidden');
    };
    
    const hideMessage = () => messageContainer.classList.add('hidden');
    
    const clearResults = () => {
        resultsGrid.innerHTML = '';
        if(initialMessage) initialMessage.style.display = 'none';
    };

    // --- API Fetching Functions ---
    const fetchRecipesByIngredient = async (ingredient) => {
        showLoader();
        hideMessage();
        clearResults();
        
        try {
            const response = await fetch(`${API_BASE_URL}/filter.php?i=${ingredient}`);
            if (!response.ok) throw new Error('Network response was not ok.');
            
            const data = await response.json();
            
            if (data.meals) {
                displayRecipes(data.meals);
            } else {
                showMessage(`No recipes found for "${ingredient}". Try another ingredient!`);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            showMessage('Could not fetch recipes. Please check your connection and try again.', true);
        } finally {
            hideLoader();
        }
    };
    
    const fetchRecipeDetails = async (mealId) => {
        modalBody.innerHTML = '<div class="loader"></div>';
        openModal();

        try {
            const response = await fetch(`${API_BASE_URL}/lookup.php?i=${mealId}`);
            if (!response.ok) throw new Error('Network response was not ok.');
            
            const data = await response.json();
            
            if (data.meals && data.meals[0]) {
                displayRecipeDetails(data.meals[0]);
            } else {
                throw new Error('Recipe details not found.');
            }
        } catch (error) {
            console.error('Fetch details error:', error);
            modalBody.innerHTML = '<p class="error-message">Failed to load recipe details. Please try again later.</p>';
        }
    };

    // --- UI Display Functions ---
    const displayRecipes = (recipes) => {
        resultsGrid.innerHTML = recipes.map(recipe => `
            <div class="recipe-card" data-meal-id="${recipe.idMeal}" role="button" tabindex="0" aria-label="View recipe for ${recipe.strMeal}">
                <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" class="recipe-card-img" loading="lazy">
                <div class="recipe-card-body">
                    <h3 class="recipe-card-title">${recipe.strMeal}</h3>
                </div>
            </div>
        `).join('');
    };

    const displayRecipeDetails = (meal) => {
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient && ingredient.trim() !== '') {
                ingredients.push(`<li>${measure} ${ingredient}</li>`);
            }
        }

        const videoId = meal.strYoutube ? new URL(meal.strYoutube).searchParams.get('v') : null;
        const videoHtml = videoId 
            ? `
                <div class="video-container">
                    <iframe 
                        width="560" 
                        height="315" 
                        src="https://www.youtube.com/embed/${videoId}" 
                        title="YouTube video player for ${meal.strMeal}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
            ` 
            : '';

        modalBody.innerHTML = `
            <h2 id="modal-title" class="modal-title">${meal.strMeal}</h2>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="modal-img">
            
            <div class="modal-section">
                <h3>Ingredients</h3>
                <ul class="ingredient-list">${ingredients.join('')}</ul>
            </div>
            
            <div class="modal-section">
                <h3>Instructions</h3>
                <p class="instructions">${meal.strInstructions.replace(/\r\n/g, '<br>')}</p>
            </div>
            
            ${videoHtml ? `
            <div class="modal-section">
                <h3>Video Tutorial</h3>
                ${videoHtml}
            </div>
            ` : ''}
        `;
    };

    // --- Modal Handling ---
    const openModal = () => {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    const closeModal = () => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    // --- Event Listeners ---
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            fetchRecipesByIngredient(searchTerm);
            searchInput.blur();
        } else {
            showMessage("Please enter an ingredient to search.", true);
        }
    });

    resultsGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.recipe-card');
        if (card) {
            const mealId = card.dataset.mealId;
            fetchRecipeDetails(mealId);
        }
    });
    
    resultsGrid.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            const card = e.target.closest('.recipe-card');
            if (card) {
                e.preventDefault();
                const mealId = card.dataset.mealId;
                fetchRecipeDetails(mealId);
            }
        }
    });

    modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay') || e.target.classList.contains('close-button')) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
});
