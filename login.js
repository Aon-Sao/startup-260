"use strict"

// Need to listen for click on sign in button
// Pass the values of the login fields to the server
// Get a response back, display signed-in user

// Declare variables to grab elements
const loginButton = document.querySelector("#login-btn");
const usernameField = document.querySelector("#username");
const passwordField = document.querySelector("#password");
const currentUserDisplay = document.querySelector("#current-user-display");

// Add event listener to sign in button
loginButton.addEventListener("click", (event) => authenticate(usernameField.value, passwordField.value));

// Authenticate with the server (placeholder)
async function authenticate(username, password) {
    console.log("clicked sign in button");
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    // Make this a real check later
    const authStatus = true;
    console.log(`Auth status: ${authStatus}`);
    if (authStatus) updateCurrentUser(username);
    return authStatus;
}

function updateCurrentUser(username) {
    // I think this introduces a vulnerability
    currentUserDisplay.innerText = `Current user: ${username}`
}
