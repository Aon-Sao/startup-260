// Mandatory third party call
const jokeElem = document.querySelector("#joke-text");
async function getJoke() {
  // https://api.chucknorris.io/jokes/random?category=dev 
   const response = await fetch("https://api.chucknorris.io/jokes/random?category=dev", {
    method: "GET",
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  .then((response) => response.json())
  .then((jsonResponse) => {  
      return jsonResponse;
    })
  return response;
}

const joke = await getJoke();
jokeElem.textContent = joke.value;

// REPL
const cmdBox = document.querySelector("#command-input")
const stdinBox = document.querySelector("#stdin")
const stdoutBox = document.querySelector("#stdout")
const stderrBox = document.querySelector("#stderr")

cmdBox.addEventListener('keyup', (event) => {
    console.log(cmdBox.value);
    processInput(cmdBox.value, stdinBox.value);
});

stdinBox.addEventListener('keyup', (event) => {
    console.log(stdinBox.value);
    processInput(cmdBox.value, stdinBox.value);
});

function updateOutput(stdout, stderr) {
    // Should only adjust the representation
    stdoutBox.value = stdout;
    stderrBox.value = stderr;
}
function processInput(cmd, stdin) {
    fetch(`/api/SubmitCmdSet`, {
  method: 'POST',
  body: packCmdSet(),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((jsonResponse) => {   
    updateOutput(jsonResponse.stdout, jsonResponse.stderr);
  });

    // let stdout = "It looks like I may actually need more backend before my app is functional";
    // stdout += `\n\nYou typed:\n${cmd}\n\n${stdin}`;
    // const stderr = "Not sure what deliverable that will be part of, but I hope it's soon.";
    // updateOutput(jsonResponse.stdout, jsonResponse.stderr);
}

function packCmdSet() {
  return JSON.stringify({cmd: cmdBox.value, stdin: stdinBox.value, user: 0});
}

// WebSocket
setInterval(() => {
    const newRecordEl = document.querySelector("#websocket-zone");
    let recordLength = 0;
    if (localStorage.getItem("signed-in") === "true") {
        setInterval(() => {
            newRecordEl.textContent = `some-user has the longest pipeline at ${recordLength} characters`;
            recordLength++;
        }, 5000);

    } else {
        newRecordEl.textContent = "Sign in to save commands and see WebSocket stuff"
    }
}, 10000);

// Database
const saveBtn = document.querySelector("#save-command-btn");
saveBtn.addEventListener('click', (event) => {
 fetch(`/api/SaveCmdSet`, {
  method: 'POST',
  body: packCmdSet(),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((jsonResponse) => {
    console.log(`Saved Command Set`);   
  });
});

// Login
const newUserBtn = document.querySelector("#new-user-btn");
const loginButton = document.querySelector("#login-btn");
const usernameField = document.querySelector("#username");
const passwordField = document.querySelector("#password");
const currentUserDisplay = document.querySelector("#current-user-display");

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
  });
  updateCurrentUser(usernameField.value);
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

