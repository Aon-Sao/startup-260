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

saveBtn.addEventListener('click', async (event) => {
  const cmdset = await packCmdSet();
  console.log(`soon to ship `, cmdset);
  fetch(`/api/SaveCmdSet`, {
        method: 'POST',
        body: cmdset,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((jsonResponse) => {
            console.log(`Saved Command Set`);
        });
});

async function packCmdSet() {
  const user = await fetch('/api/user/me', {
    method: 'GET',
    headers: { 'Conetnt-type': 'application/json; charseet=UTF-8' }
  }).then((r) => r.json());
  console.log("saving cmdset for user: ", await user);
  const cmdset = JSON.stringify({cmd: cmdBox.value, stdin: stdinBox.value, user: await user.email });
  console.log(`packed `, cmdset);
  return cmdset;
}
function updateOutput(stdout, stderr) {
    // Should only adjust the representation
    stdoutBox.value = stdout;
    stderrBox.value = stderr;
}
async function processInput() {
  const cmdset = await packCmdSet();
  console.log(`soon shipping`, cmdset);
  fetch(`/api/SubmitCmdSet`, {
        method: 'POST',
        body: cmdset,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((jsonResponse) => {
            updateOutput(jsonResponse.stdout, jsonResponse.stderr);
        });
}
