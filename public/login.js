'use strict'

const newUserBtn = document.querySelector("#new-user-btn");
const loginButton = document.querySelector("#login-btn");
const usernameField = document.querySelector("#username");
const passwordField = document.querySelector("#password");
const currentUserDisplay = document.querySelector("#current-user-display");

// These fetch requests should have .then handlers to update current user.

loginButton.addEventListener('click', (event) => {
    fetch(`/api/auth/login`, {
        method: 'POST',
        body: JSON.stringify({
            email: usernameField.value,
            password: passwordField.value,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then((res) => {
      if (res.status == 401) {
        clearCurrentUser()
      } else {
      updateCurrentUser(usernameField.value);
      }
    })
});

newUserBtn.addEventListener('click', (event) => {
    fetch(`/api/auth/create`, {
        method: 'POST',
        body: JSON.stringify({
            email: usernameField.value,
            password: passwordField.value,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    updateCurrentUser(usernameField.value);
});

// Do I need a getMe call? Should that endpoint be in the UI?

function updateCurrentUser(username) {
    currentUserDisplay.textContent = `Current user: ${username}`;
}

function clearCurrentUser() {
    currentUserDisplay.textContent = `Current user: signed out`;
}
