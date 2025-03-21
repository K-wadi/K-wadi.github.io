// OpenWeatherMap API configuration
const API_KEY = ''; // User will need to add their API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// DOM Elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const currentLocationBtn = document.getElementById('current-location');
const cityName = document.getElementById('city-name');
const date = document.getElementById('date');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weather-description');
const windSpeed = document.getElementById('wind-speed');
const humidity = document.getElementById('humidity');
const feelsLike = document.getElementById('feels-like');
const forecast = document.getElementById('forecast');
const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
const errorMessage = document.getElementById('error-message');

// Bootstrap toast initialization
const toast = new bootstrap.Toast(errorToast);

// Event Listeners
searchBtn.addEventListener('click', () => getWeatherByCity(cityInput.value));
currentLocationBtn.addEventListener('click', getWeatherByLocation);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeatherByCity(cityInput.value);
    }
});

// Update current date
function updateDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    date.textContent = now.toLocaleDateString('en-US', options);
}

// Get weather by city name
async function getWeatherByCity(city) {
    if (!city) {
        showError('Please enter a city name');
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'City not found');
        }

        updateCurrentWeather(data);
        getForecast(data.coord.lat, data.coord.lon);
    } catch (error) {
        showError(error.message);
    }
}

// Get weather by current location
function getWeatherByLocation() {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by your browser');
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            try {
                const response = await fetch(`${BASE_URL}/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${API_KEY}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Failed to get weather data');
                }

                updateCurrentWeather(data);
                getForecast(position.coords.latitude, position.coords.longitude);
            } catch (error) {
                showError(error.message);
            }
        },
        (error) => {
            showError('Unable to retrieve your location');
        }
    );
}

// Update current weather display
function updateCurrentWeather(data) {
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`; // Convert m/s to km/h
    humidity.textContent = `${data.main.humidity}%`;
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.alt = data.weather[0].description;
}

// Get and display 5-day forecast
async function getForecast(lat, lon) {
    try {
        const response = await fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to get forecast data');
        }

        displayForecast(data.list);
    } catch (error) {
        showError(error.message);
    }
}

// Display forecast data
function displayForecast(forecastList) {
    forecast.innerHTML = '';
    
    // Get one forecast per day (every 8th item as data is in 3-hour intervals)
    const dailyForecasts = forecastList.filter((item, index) => index % 8 === 0);
    
    dailyForecasts.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        forecastItem.innerHTML = `
            <div class="date">${dayName}</div>
            <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" alt="${item.weather[0].description}">
            <div class="temp">${Math.round(item.main.temp)}°C</div>
        `;
        
        forecast.appendChild(forecastItem);
    });
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorModal.show();
}

// Initialize the app
updateDate(); 