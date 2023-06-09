'use strict'

const jokeElem = document.querySelector("#joke-text");
async function getJoke() {
    // https://api.chucknorris.io/jokes/random?category=dev
    return await fetch("https://api.chucknorris.io/jokes/random?category=dev", {
        method: "GET",
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
        .then((response) => response.json())
        .then((jsonResponse) => {
            return jsonResponse;
        });
}

const joke = await getJoke();
jokeElem.textContent = joke.value;