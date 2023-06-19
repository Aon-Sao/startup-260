// Adjust the webSocket protocol to what is being used for HTTP
const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

const socketEl = document.querySelector("#websocket-zone");

// Display that we have opened the webSocket
socket.onopen = (event) => {
  console.log("WebSocket connection opened");
  socket.send(`{ "value": "Out: WebSocket up" }`);
};

// Display messages we receive from our friends
socket.onmessage = async (event) => {
  const text = await event.data.text();
  console.log(text);
  const chat = JSON.parse(text);
  // const text = JSON.parse(await event.data.text());
  console.log(`Got message: ${chat.value}`);
};

// If the webSocket is closed, tell the user
socket.onclose = (event) => {
  // appendMsg('system', 'websocket', 'disconnected');
  console.log("WebSocket connection closed");
  // socketEl.textContent = "WebSocket connection closed";
};

// Send message if new longest, need to design
