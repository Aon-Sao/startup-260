'use strict'
// Adapted from the simon example, an excellent existing asset to leverage

const express = require('express');
const app = express();

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

apiRouter.post(`/SubmitCmdSet`, async (req, res) => {
  const result = await evaluateCmdSet(req.body.cmd, req.body.stdin);
  res.status(200).json(result);
})

function isSafeCmd(cmd, stdin) { return true; }

async function evaluateCmdSet(cmd, stdin) {
  console.log("Evaluating CmdSet");
  if (not (isSafeCmd(cmd, stdin))) {
    console.log(`Unsafe cmd: ${cmd}\n${stdin}`);
    return {cmd: cmd, stdin: stdin, stdout: "", stderr: "That command doesn't look right."};
  } else {
    let result = {cmd: cmd, stdin: stdin};
    const { spawn } = require('child_process');
    const Readable = require('stream').Readable;
  
    // Create child process
    // I need to split the passed cmd into program and args
    // This method is poor, all spaces are treated as separating
    // arguments, and quoting or escaping won't save you.
    // I also don't support piping like I wanted to,
    // and may need to refactor to exec instead of spawn so to do.
    // Executing user input in the shell is a huge security problem.
    const commandSplit = cmd.split(' ');
    const child = spawn(commandSplit[0], commandSplit.slice(1));
  
    // Create a stream from passed stdin and pipe it to the child
    const inStream = Readable.from(stdin);
    inStream.pipe(child.stdin);
    
    // Event handler for when the child exits
    child.on('exit', function (code, signal) {
      console.log('child process exited with ' +
                  `code ${code} and signal ${signal}`);
    });
    
    for await (const data of child.stdout) {
      result.stdout = `${data}`;
    }
  
    for await (const data of child.stderr) {
      result.stderr = `${data}`;
    }
  
    // When stdout or stderr of the child process have
    // a data event, write to console and store in result.
    // child.stdout.on('data', (data) => {
      // console.log(`child stdout:\n${data}`);
      // result.stdout = data;
      // console.log('stdout result', result);
    // });
  
    // child.stderr.on('data', (data) => {
      // console.error(`child stderr:\n${data}`);
      // result.stderr = data.toString();
      // console.log('stderr result', result);
    // });
    
    result.stdout = (typeof result.stdout === 'undefined') ? "" : result.stdout;
    result.stderr = (typeof result.stderr === 'undefined') ? "" : result.stderr;
  
    console.log("Result: ", result);
    return result;
  }
}

apiRouter.post(`/SaveCmdSet`, async (req, res) => {
  const result = await evaluateCmdSet(req.body.cmd, req.body.stdin);
  storeCmdSet(result);
  res.status(201).json(result);
})

apiRouter.get(`/BrowseCmdSet`, async (req, res) => {
  const result = await getAllCmdSets();
  res.status(200).json(result);
})

// Set up Database
const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const Mclient = new MongoClient(url);
const Mdb = Mclient.db('startup')
const cmdsetCollection = Mdb.collection('cmdsets');

async function storeCmdSet(cmdset) {
  return await cmdsetCollection.insertOne(cmdset);
}

async function getAllCmdSets() {
  result = cmdsetCollection.find();
  // console.log(await result.toArray());
  return result.toArray();
}

// Need to specify cmdsets so I can request remove update specific cmdsets.

// Return the application's default page if the path is unknown
// Does omitting the first parameter default to * ?
app.use((_req, res) => {
  console.log(`Unknown path: ${_req.path}`);
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

