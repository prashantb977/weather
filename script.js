const API_KEY = "b2303299cbb04699955115616251307"; 


const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherDisplay = document.getElementById("weatherDisplay");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const errorMessage = document.getElementById("errorMessage");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weatherDescription");
const feelslike = document.getElementById("feelslike");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const weatherIcon = document.getElementById("weatherIcon");

searchBtn.addEventListener("click", handleSearch);
cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        handleSearch();
    }
});

function handleSearch() {
    const city = cityInput.value.trim();
    if (!city) {
        showError("Please enter a City Name");
        return;
    }
    hideAllSections();
    showLoading();
    fetchWeatherData(city);
}

async function fetchWeatherData(city) {
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch weather data.");
        }
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        hideLoading();
        showError(error.message);
    }
}

function displayWeatherData(data) {
    hideLoading();
    cityName.textContent = `${data.location.name}, ${data.location.country}`;
    temperature.textContent = `Temperature: ${data.current.temp_c} °C`;
    weatherDescription.textContent = `Condition: ${data.current.condition.text}`;
    feelslike.textContent = `Feels Like: ${data.current.feelslike_c} °C`;
    humidity.textContent = `Humidity: ${data.current.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.current.wind_kph} kph`;
    weatherIcon.src = "https:" + data.current.condition.icon;
    weatherIcon.alt = data.current.condition.text;
    weatherDisplay.classList.remove("hidden");
}

function showError(message) {
    errorMessage.textContent = message;
    error.classList.remove("hidden");
}

function hideAllSections() {
    weatherDisplay.classList.add("hidden");
    error.classList.add("hidden");
}

function showLoading() {
    loading.classList.remove("hidden");
}

function hideLoading() {
    loading.classList.add("hidden");
}

// Carousel Effect
let slides = document.querySelectorAll(".slide");
let index = 0;
setInterval(() => {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
}, 5000);
