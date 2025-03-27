"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let result = document.querySelector('.joke-container');
let button = document.querySelector('#next-button');
const reportAcudits = [];
let currentJoke = '';
let selectedScore = null;
const weatherAPIKey = '23a5e712a2ed80f4cf34012eb36c0b44';
const getWeatherFromCoordinates = (lat, lon) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const weatherLocation = yield fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude={part}&appid=${weatherAPIKey}&units=metric`);
        const data = yield weatherLocation.json();
        return data;
    }
    catch (error) {
        alert(`Error: ${error}`);
    }
});
const loadWeather = () => {
    const weatherIcon = document.getElementById('weather-icon');
    const temperature = document.getElementById('temperature');
    try {
        if (!navigator.geolocation) {
            weatherIcon.innerText = "Geolocation not supported.";
            return;
        }
        navigator.geolocation.getCurrentPosition((position) => __awaiter(void 0, void 0, void 0, function* () {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const weather = yield getWeatherFromCoordinates(lat, lon);
            if (weather) {
                weatherIcon.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
                weatherIcon.alt = weather.weather[0].description;
                temperature.innerText = `${weather.main.temp.toFixed(0)}ºC `;
            }
        }));
    }
    catch (error) {
        console.error(error);
        alert('Unable to load weather.');
    }
};
loadWeather();
const getDadJoke = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('https://icanhazdadjoke.com/', {
            headers: { 'Accept': 'application/json' }
        });
        const data = yield response.json();
        result.innerHTML = data.joke;
        currentJoke = data.joke;
        // selectedScore = null;
        return currentJoke;
    }
    catch (error) {
        result.innerHTML = `An error was produced: ${error}`;
    }
});
const emojiButtons = document.querySelectorAll('.emoji-btn');
emojiButtons.forEach((button) => {
    button.addEventListener('click', () => {
        selectedScore = button.id;
    });
});
button.addEventListener('click', () => {
    const now = new Date().toISOString();
    if (selectedScore !== null) {
        reportAcudits.push({
            joke: `${currentJoke}`,
            score: `${selectedScore}`,
            date: `${now}`
        });
        console.log(reportAcudits);
    }
    else {
        reportAcudits.push({
            joke: `${currentJoke}`,
            score: `${selectedScore}`,
            date: `${now}`
        });
    }
    getDadJoke();
});
getDadJoke();
//     weatherDiv.innerHTML = `
//         <img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" alt="${weather.weather[0].description}">
//         ${weather.main.temp.toFixed(0)}°C
//     `;
// } else {
//     weatherDiv.innerText = 'Could not load weather.';
// }
//# sourceMappingURL=index.js.map