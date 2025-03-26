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