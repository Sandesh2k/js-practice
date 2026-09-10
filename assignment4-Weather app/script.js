const cityInput = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#searchBtn");
const retryBtn = document.querySelector("#retryBtn");
const status = document.querySelector("#status");
const weather = document.querySelector("#weather");

let controller;

async function getWeather() {
    const city = cityInput.value.trim();

    if (!city) {
        status.textContent = "Please enter a city.";
        return;
    }

    if (controller) {
        controller.abort();
    }

    controller = new AbortController();

    status.textContent = "Loading...";
    weather.innerHTML = "";
    retryBtn.hidden = true;

    try {
        const locationResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`,
            {
                signal: controller.signal
            }
        );

        if (!locationResponse.ok) {
            throw new Error("Failed to find city");
        }

        const locationData = await locationResponse.json();

        if (!locationData.results) {
            throw new Error("City not found");
        }

        const location = locationData.results[0];

        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`,
            {
                signal: controller.signal
            }
        );

        if (!weatherResponse.ok) {
            throw new Error("Failed to fetch weather");
        }

        const weatherData = await weatherResponse.json();
        status.textContent = "";

        weather.innerHTML = `
            <h2>${location.name}</h2>
            <p>Temperature: ${weatherData.current.temperature_2m}°C</p>
            <p>Humidity: ${weatherData.current.relative_humidity_2m}%</p>
            <p>Wind: ${weatherData.current.wind_speed_10m} km/h</p>
        `;

    } catch (error) {
        if (error.name === "AbortError") {
            return;
        }

        console.error(error);

        status.textContent = "Something went wrong.";
        retryBtn.hidden = false;
    }
}
searchBtn.addEventListener("click", getWeather);


cityInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        getWeather();
    }
});


retryBtn.addEventListener("click", getWeather); 