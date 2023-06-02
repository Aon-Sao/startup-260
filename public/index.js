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
    // Evaluates the command + stdin
    // const { exec } = require('child_process');
    // import { exec } from "child_process";
    // exec('bash -c "echo this"', (err, stdout, stderr) => {
    //     if (err) {
    //         //some err occurred
    //         console.error(err)
    //     } else {
    //         // the *entire* stdout and stderr (buffered)
    //         console.log(`stdout: ${stdout}`);
    //         console.log(`stderr: ${stderr}`);
    //     }
    // });
    
    fetch('http://localhost:4000/api/SubmitCmdSet', {
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
 fetch('http://localhost:4000/api/SaveCmdSet', {
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
 
})
