
import { GoogleGenAI, Type } from "@google/genai";

// --- DOM ELEMENT SELECTION ---
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const initialStateEl = document.getElementById('initial-state');
const loaderEl = document.getElementById('loader');
const errorDisplayEl = document.getElementById('error-display');
const errorMessageEl = document.getElementById('error-message');
const weatherDisplayEl = document.getElementById('weather-display');

// Weather data elements
const cityNameEl = document.getElementById('city-name');
const weatherIconContainer = document.getElementById('weather-icon-container');
const temperatureEl = document.getElementById('temperature');
const conditionEl = document.getElementById('condition');
const feelsLikeEl = document.getElementById('feels-like');
const humidityEl = document.getElementById('humidity');
const windSpeedEl = document.getElementById('wind-speed');

// Info icons
const tempIconEl = document.getElementById('temp-icon');
const humidityIconEl = document.getElementById('humidity-icon');
const windIconEl = document.getElementById('wind-icon');


// --- UI HELPER FUNCTIONS ---

const iconSVG = {
    temperature: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16V4a4 4 0 10-8 0v12a6 6 0 108 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M13 10h4m-2-2v4" /></svg>`,
    humidity: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M7 16a5 5 0 01-.9-9.9m10.8 0A5.02 5.02 0 0117 8a5 5 0 01-1 9.9M12 21a9 9 0 110-18 9 9 0 010 18zm0 0a9 9 0 000-18m0 18c-5 0-9-4-9-9s4-9 9-9" /></svg>`,
    wind: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 19l-7-7 7-7m5 14l7-7-7-7" /></svg>`,
    sunny: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#FFC107" stroke-width="3"><circle cx="32" cy="32" r="10" /><line x1="32" y1="5" x2="32" y2="15" /><line x1="32" y1="49" x2="32" y2="59" /><line x1="15" y1="32" x2="5" y2="32" /><line x1="59" y1="32" x2="49" y2="32" /><line x1="12.9" y1="12.9" x2="19.9" y2="19.9" /><line x1="44.1" y1="44.1" x2="51.1" y2="51.1" /><line x1="12.9" y1="51.1" x2="19.9" y2="44.1" /><line x1="44.1" y1="19.9" x2="51.1" y2="12.9" /></svg>`,
    cloudy: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="#B0BEC5" stroke="#90A4AE" stroke-width="3"><path d="M47.7,35.4c4.3-1.3,7.3-5.4,7.3-10.4c0-6.1-4.9-11-11-11c-2.7,0-5.2,1-7.2,2.7c-2.4-5-7.5-8.5-13.3-8.5 c-8.3,0-15,6.7-15,15c0,1.9,0.4,3.7,1,5.4" /><path d="M47.7,35.4c-0.2,0.1-0.4,0.1-0.6,0.2c-0.5-0.1-1-0.1-1.5-0.1c-6.1,0-11,4.9-11,11c0,0.8,0.1,1.6,0.3,2.4" /><path d="M16.9,42.9c-3.8-0.8-7,2-7,5.9c0,3.3,2.7,6,6,6h29.5" /></svg>`,
    rain: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="#42A5F5" stroke="#1E88E5" stroke-width="3"><path d="M47.7,35.4c4.3-1.3,7.3-5.4,7.3-10.4c0-6.1-4.9-11-11-11c-2.7,0-5.2,1-7.2,2.7c-2.4-5-7.5-8.5-13.3-8.5 c-8.3,0-15,6.7-15,15c0,1.9,0.4,3.7,1,5.4" fill="#B0BEC5" stroke="#90A4AE" /><line x1="22" y1="48" x2="22" y2="58" /><line x1="32" y1="48" x2="32" y2="58" /><line x1="42" y1="48" x2="42" y2="58" /></svg>`,
    snow: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="#E1F5FE" stroke="#B3E5FC" stroke-width="3"><path d="M47.7,35.4c4.3-1.3,7.3-5.4,7.3-10.4c0-6.1-4.9-11-11-11c-2.7,0-5.2,1-7.2,2.7c-2.4-5-7.5-8.5-13.3-8.5 c-8.3,0-15,6.7-15,15c0,1.9,0.4,3.7,1,5.4" fill="#B0BEC5" stroke="#90A4AE" /><path d="M22,53 l-3-3 l3-3" /><path d="M22,53 l3,3 l-3,3" /><path d="M22,53 l-4.2,0 l4.2,0" /><path d="M32,53 l-3-3 l3-3" /><path d="M32,53 l3,3 l-3,3" /><path d="M32,53 l-4.2,0 l4.2,0" /><path d="M42,53 l-3-3 l3-3" /><path d="M42,53 l3,3 l-3,3" /><path d="M42,53 l-4.2,0 l4.2,0" /></svg>`
};

function getWeatherIcon(condition) {
    const lowerCaseCondition = condition.toLowerCase();
    if (lowerCaseCondition.includes('rain') || lowerCaseCondition.includes('drizzle')) return iconSVG.rain;
    if (lowerCaseCondition.includes('snow') || lowerCaseCondition.includes('sleet')) return iconSVG.snow;
    if (lowerCaseCondition.includes('clear') || lowerCaseCondition.includes('sun')) return iconSVG.sunny;
    if (lowerCaseCondition.includes('cloud') || lowerCaseCondition.includes('overcast') || lowerCaseCondition.includes('fog') || lowerCaseCondition.includes('mist')) return iconSVG.cloudy;
    return iconSVG.cloudy; // Default
}

function displayError(message) {
    initialStateEl.classList.add('hidden');
    weatherDisplayEl.classList.add('hidden');
    loaderEl.classList.add('hidden');
    
    errorMessageEl.textContent = message;
    errorDisplayEl.classList.remove('hidden');
}

function updateUI(weatherData) {
    // Hide other states
    initialStateEl.classList.add('hidden');
    loaderEl.classList.add('hidden');
    errorDisplayEl.classList.add('hidden');

    // Update content
    cityNameEl.textContent = weatherData.city || cityInput.value;
    temperatureEl.textContent = `${Math.round(weatherData.temperature)}°C`;
    conditionEl.textContent = weatherData.condition;
    weatherIconContainer.innerHTML = getWeatherIcon(weatherData.condition);
    feelsLikeEl.textContent = `${Math.round(weatherData.temperature)}°`;
    humidityEl.textContent = `${weatherData.humidity}%`;
    windSpeedEl.textContent = `${weatherData.windSpeed} km/h`;
    
    // Show the weather display
    weatherDisplayEl.classList.remove('hidden');
}

function setLoadingState(isLoading) {
    cityInput.disabled = isLoading;
    searchButton.disabled = isLoading;
    if (isLoading) {
        initialStateEl.classList.add('hidden');
        errorDisplayEl.classList.add('hidden');
        weatherDisplayEl.classList.add('hidden');
        loaderEl.classList.remove('hidden');
    } else {
        loaderEl.classList.add('hidden');
    }
}

// --- START OF CONFIGURATION ---

//--- Add Your Gemini API Key here

const API_KEY = "YOUR_API_KEY_HERE";

// --- END OF CONFIGURATION ---

if (!API_KEY) {
    displayError("API_KEY is not configured. Please set it up in the environment variables.");
    throw new Error("API key not found.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const weatherSchema = {
    type: Type.OBJECT,
    properties: {
        city: { type: Type.STRING, description: 'The name of the city.' },
        temperature: { type: Type.NUMBER, description: 'The current temperature in Celsius.' },
        condition: { type: Type.STRING, description: 'A brief description of the weather condition (e.g., "Clear", "Cloudy", "Rain", "Snow").' },
        humidity: { type: Type.NUMBER, description: 'The current humidity percentage.' },
        windSpeed: { type: Type.NUMBER, description: 'The current wind speed in kilometers per hour.' },
        error: { type: Type.STRING, description: 'An error message if the city is not found or data is unavailable. Should be null or omitted otherwise.' },
    },
    required: ['temperature', 'condition', 'humidity', 'windSpeed'],
};

// --- API LOGIC ---

async function fetchWeather(city) {
    const prompt = `Fetch the current weather for ${city}. Provide the temperature in Celsius, a brief weather condition, humidity in percent, and wind speed in km/h. If the city is invalid or you cannot find data, please set the 'error' field in the JSON response.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: weatherSchema,
            },
        });
        
        const jsonString = response.text.trim();
        const weatherData = JSON.parse(jsonString);
        return weatherData;
    } catch (error) {
        console.error("Error fetching weather data from Gemini API:", error);
        // This will be caught by the handler's catch block
        throw new Error("Could not retrieve weather data from the API.");
    }
}

// --- EVENT HANDLER ---

async function handleSearch(event) {
    event.preventDefault();
    const city = cityInput.value.trim();

    if (!city) {
        displayError('Please enter a city name.');
        return;
    }

    setLoadingState(true);

    try {
        const data = await fetchWeather(city);
        if (data.error) {
            displayError(data.error);
        } else {
            updateUI(data);
        }
    } catch (err) {
        console.error(err);
        displayError('Failed to fetch weather data. Please try again later.');
    } finally {
        setLoadingState(false);
    }
}

// --- INITIALIZATION ---

function init() {
    searchForm.addEventListener('submit', handleSearch);
    
    // Set up initial icons
    const initialIconContainer = document.createElement('div');
    initialIconContainer.style.width = '6rem'; // w-24
    initialIconContainer.style.height = '6rem'; // h-24
    initialIconContainer.style.margin = '0 auto';
    initialIconContainer.style.opacity = '0.5';
    initialIconContainer.innerHTML = iconSVG.sunny;
    initialStateEl.prepend(initialIconContainer);
    
    tempIconEl.innerHTML = iconSVG.temperature;
    humidityIconEl.innerHTML = iconSVG.humidity;
    windIconEl.innerHTML = iconSVG.wind;
}

// Run app
init();

