'use strict'

const cmdBox = document.querySelector("#command-input")
const stdinBox = document.querySelector("#stdin")
const stdoutBox = document.querySelector("#stdout")
const stderrBox = document.querySelector("#stderr")
const saveBtn = document.querySelector("#save-command-btn");

cmdBox.addEventListener('keyup', (event) => {
    console.log(cmdBox.value);
    processInput(cmdBox.value, stdinBox.value);
});

stdinBox.addEventListener('keyup', (event) => {
    console.log(stdinBox.value);
    processInput(cmdBox.value, stdinBox.value);
});

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

function packCmdSet() {
    return JSON.stringify({cmd: cmdBox.value, stdin: stdinBox.value, user: 0});
}
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
}