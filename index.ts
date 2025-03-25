let result = document.querySelector('.joke-container') as HTMLElement
let button = document.querySelector('#next-button') as HTMLButtonElement


async function getDadJoke() {
    try {
        const response = await fetch('https://icanhazdadjoke.com/', {
            headers: {
                'Accept': 'application/json'
            }
        });
         
        const data = await response.json();
        result.innerHTML = data.joke
        return data.joke
        
    } catch (error) {
        result.innerHTML = `An error was produced: ${error}`
    }
}

getDadJoke()

button.addEventListener('click', getDadJoke);