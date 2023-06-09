'use strict'

const newRecordEl = document.querySelector("#websocket-zone");

setInterval(() => {
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