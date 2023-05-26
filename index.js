// REPL



// WebSocket
// if signed-in is true
const newRecordEl = document.querySelector("#websocket-zone");

let recordLength = 0;
setInterval(() => {
    newRecordEl.textContent = `some-user has the longest pipeline at ${recordLength} characters`;
    recordLength++;
}, 5000);
