const weatherIcons = {
    // Clear conditions
    'clear sky': 'bi-sun',
    'clear': 'bi-sun',

    // Cloudy conditions
    'few clouds': 'bi-cloud-sun',
    'scattered clouds': 'bi-cloud',
    'broken clouds': 'bi-clouds',
    'overcast clouds': 'bi-clouds-fill',

    // Rain conditions
    'light rain': 'bi-cloud-drizzle',
    'moderate rain': 'bi-cloud-rain',
    'heavy rain': 'bi-cloud-rain-heavy',
    'rain': 'bi-cloud-rain',
    'shower rain': 'bi-cloud-rain',

    // Thunderstorm conditions
    'thunderstorm': 'bi-cloud-lightning-rain',
    'thunderstorm with light rain': 'bi-cloud-lightning-rain',
    'thunderstorm with rain': 'bi-cloud-lightning-rain',
    'thunderstorm with heavy rain': 'bi-cloud-lightning-rain',

    // Snow conditions
    'snow': 'bi-snow',
    'light snow': 'bi-snow',
    'heavy snow': 'bi-snow2',
    'sleet': 'bi-cloud-sleet',

    // Atmosphere conditions
    'mist': 'bi-cloud-fog',
    'fog': 'bi-cloud-fog2',
    'haze': 'bi-cloud-haze',
    'smoke': 'bi-cloud-haze2',
    'dust': 'bi-cloud-haze2',
    'sand': 'bi-cloud-haze2',
    'ash': 'bi-cloud-haze2',
    'squall': 'bi-wind',
    'tornado': 'bi-tornado'
};

// Function to get the appropriate icon class based on weather condition
function getWeatherIcon(condition) {
    condition = condition.toLowerCase();
    return weatherIcons[condition] || 'bi-question-circle'; // Default icon if condition not found
} 