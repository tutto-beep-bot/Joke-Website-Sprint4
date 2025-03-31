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

const loadWeather = (): void => {
    const weatherIcon  = document.getElementById('weather-icon') as HTMLImageElement
    const temperature = document.getElementById('temperature') as HTMLElement

    try {

        if(!navigator.geolocation) {
            weatherIcon.innerText = "Geolocation not supported."
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
    
        const weather = await getWeatherFromCoordinates(lat, lon);
    
        if (weather) {
            weatherIcon.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
            weatherIcon.alt = weather.weather[0].description;
            temperature.innerText = `${weather.main.temp.toFixed(0)}ºC `
        }
        });
    } catch (error) {
        console.error(error)
        alert('Unable to load weather.')
    }
};


loadWeather()


const getDadJoke = async (): Promise<string | undefined> => {
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


const getChuckNorrisJoke = async (): Promise<string | undefined> => {
    try {
        const response = await fetch('https://api.chucknorris.io/jokes/random', {
            headers: { 'Accept' : 'application/json'}
        })
        const data = await response.json();
        result.innerHTML = data.value

        currentJoke = data.value;

        selectedScore = null;

        return currentJoke

    } catch (error) {
        result.innerHTML = `An error was produced: ${error}`
    }
}

const getRandomJoke = async (): Promise<string | undefined> => {
    const random = Math.random()
    if (random < 0.5){
        return await getDadJoke();
    } else {
        return await getChuckNorrisJoke();
    }
}


const emojiButtons = document.querySelectorAll<HTMLButtonElement>('.emoji-btn');        

emojiButtons.forEach((button) => {
    button.addEventListener('click', () => {
        selectedScore = button.id;
        
        emojiButtons.forEach(btn => btn.classList.remove('active'))

        button.classList.add('active')
    })

})



button.addEventListener('click', () => { 
    emojiButtons.forEach(btn => btn.classList.remove('active'));

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
    
    getRandomJoke()
});

getRandomJoke()

