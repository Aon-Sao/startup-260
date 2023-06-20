'use strict'

// const { sendMessage } = require('./ws.mjs');
import {sendMessage} from "./ws.mjs";

const cmdBox = document.querySelector("#command-input")
const stdinBox = document.querySelector("#stdin")
const stdoutBox = document.querySelector("#stdout")
const stderrBox = document.querySelector("#stderr")
const saveBtn = document.querySelector("#save-command-btn");

cmdBox.addEventListener('keyup', (event) => {
    processInput(cmdBox.value, stdinBox.value);
});

stdinBox.addEventListener('keyup', (event) => {
    processInput(cmdBox.value, stdinBox.value);
});

saveBtn.addEventListener('click', async (event) => {
  const cmdset = await packCmdSet();
  const req = {
        method: 'POST',
        body: cmdset,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
                },
              }
  fetch(`/api/SaveCmdSet`, req)
        .then((response) => response.json())
        .then((jsonResponse) => {
        });
  const user = JSON.parse(req.body).user;
  const length = JSON.parse(req.body).cmd.length;
  if (user === undefined) {
  } else {
    sendMessage(user, length);
  }
});

async function packCmdSet() {
  const user = await fetch('/api/user/me', {
    method: 'GET',
    headers: { 'Conetnt-type': 'application/json; charseet=UTF-8' }
  }).then((r) => r.json());
  const cmdset = JSON.stringify({cmd: cmdBox.value, stdin: stdinBox.value, user: await user.email });
  return cmdset;
}
function updateOutput(stdout, stderr) {
    // Should only adjust the representation
    stdoutBox.value = stdout;
    stderrBox.value = stderr;
}
async function processInput() {
  const cmdset = await packCmdSet();
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
