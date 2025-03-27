let result = document.querySelector('.joke-container') as HTMLElement
let button = document.querySelector('#next-button') as HTMLButtonElement

type JokeFormatted = {
    joke: string;
    score: string;
    date: string;
}

const reportAcudits: JokeFormatted[] = []
let currentJoke: string = ''
let selectedScore: string | null = null;

const weatherAPIKey: string = '23a5e712a2ed80f4cf34012eb36c0b44'

const getWeatherFromCoordinates = async (lat: number, lon: number) => {
    try {
        const weatherLocation = await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude={part}&appid=${weatherAPIKey}&units=metric`)
        const data = await weatherLocation.json()
        return data
    } catch (error) {
        alert(`Error: ${error}`)
    }
}

const loadWeather = () => {
    const weatherDiv = document.getElementById('weather-div')!

    try {

        if(!navigator.geolocation) {
            weatherDiv.innerText = "Geolocation not supported."
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
    
        const weather = await getWeatherFromCoordinates(lat, lon);
    
        if (weather) {
            weatherDiv.innerHTML = `
                ${weather.main.temp.toFixed(0)}°C
            `;
        } else {
            weatherDiv.innerText = 'Could not load weather.';
        }
        });
    } catch (error) {
        console.error(error)
        alert('Unable to load weather.')
    }
};


    loadWeather()



const getDadJoke = async () => {
    try {
        const response = await fetch('https://icanhazdadjoke.com/', {
            headers: { 'Accept': 'application/json' }
        }); 

        const data = await response.json();
        result.innerHTML = data.joke

        currentJoke = data.joke
        selectedScore = null;
        
    return currentJoke
        
    } catch (error) {
        result.innerHTML = `An error was produced: ${error}`
    }
};


const emojiButtons = document.querySelectorAll<HTMLButtonElement>('.emoji-btn');        

emojiButtons.forEach((button) => {
    button.addEventListener('click', () => {
        selectedScore = button.id;
        
    })
})



button.addEventListener('click', () => { 
    const now = new Date().toISOString();

    if (selectedScore !== null) {
        reportAcudits.push({
            joke: `${currentJoke}`,
            score: `${selectedScore}`,
            date: `${now}`
        });
        console.log(reportAcudits)
    } else {
        reportAcudits.push({
            joke: `${currentJoke}`,
            score: `${selectedScore}`,
            date: `${now}` 
        });
    }
    
    getDadJoke()
});

getDadJoke()