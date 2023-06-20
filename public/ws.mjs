// Adjust the webSocket protocol to what is being used for HTTP
const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

const socketEl = document.querySelector("#websocket-zone");

// Display that we have opened the webSocket
socket.onopen = (event) => {
  console.log("WebSocket connection opened");
};

// Display messages we receive from our friends
socket.onmessage = async (event) => {
  const msg = JSON.parse(event.data);
  displayMessage(msg);
};

// If the webSocket is closed, tell the user
socket.onclose = (event) => {
  console.log("WebSocket connection closed");
};

export function sendMessage(user, length) {
  const msg = { "user": user, "length": length };
  displayMessage(msg);
  socket.send(JSON.stringify(msg));
}

// called by send and receive
function displayMessage(msg) {
  socketEl.textContent = `User ${msg.user} saved a command with length ${msg.length}`;
}

// module.exports = {
//   sendMessage: sendMessage
// }
