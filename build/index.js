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
const getDadJoke = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('https://icanhazdadjoke.com/', {
            headers: { 'Accept': 'application/json' }
        });
        const data = yield response.json();
        result.innerHTML = data.joke;
        currentJoke = data.joke;
        selectedScore = null;
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
//# sourceMappingURL=index.js.map