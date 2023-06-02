// Adapted from the simon example, an excellent existing asset to leverage

const express = require('express');
const app = express();
let placeHolderDB = [];

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
// The top-level express object has a built-in router.
// apiRouter acts as both a middleware to the top-level
// mediator, and as a mediator for the api.
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Define middleware.

// app.use((req, res, next) => {
//   console.log(req);
//   next;
// })

apiRouter.post(`/SubmitCmdSet`, (req, res) => {
  const result = evaluateCmdSet(req.body.cmd, req.body.stdin);
  res.status(200).json(result);
})

function evaluateCmdSet(cmd, stdin) { 
  let stdout = "It looks like I may actually need more backend before my app is functional";
  stdout += `\n\nYou typed:\n${cmd}\n\n${stdin}`;
  const stderr = "Not sure what deliverable that will be part of, but I hope it's soon.";
  return {cmd: cmd, stdin: stdin, stdout: stdout, stderr: stderr};
}

apiRouter.post(`/SaveCmdSet`, (req, res) => {
  const result = evaluateCmdSet(req.body.cmd, req.body.stdin);
  placeHolderDB.push(result);
  console.log(placeHolderDB);
  res.status(201).json(result);
})

apiRouter.get(`/BrowseCmdSet`, (req, res) => {
  console.log(`Hit BrowseCmdSet`);
  res.status(200).json(placeHolderDB);
})

// Return the application's default page if the path is unknown
// Does omitting the first parameter default to * ?
app.use((_req, res) => {
  console.log(`Unknown path: ${_req.path}`);
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

