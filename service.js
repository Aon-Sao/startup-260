'use strict'

const { MongoClient } = require('mongodb');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const express = require('express');
const { WebSocketServer } = require('ws');
const app = express();

const config = require('./dbConfig.json');
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const userColl = client.db('startup').collection('users');
const cmdColl = client.db('startup').collection('cmdsets');
const wss = new WebSocketServer({ noServer: true });

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser())

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
// The top-level express object has a built-in router.
// apiRouter acts as both a middleware to the top-level
// mediator, and as a mediator for the api.
const apiRouter = express.Router();
app.use(`/api`, apiRouter);


// Define middleware.

// App functionality
apiRouter.post(`/SubmitCmdSet`, async (req, res) => {
  // const result = await evaluateCmdSet(req.body.cmd, req.body.stdin);
  const result = falseEvaluate(req.body.cmd, req.body.stdin);
  res.status(200).json(result);
})

apiRouter.post(`/SaveCmdSet`, async (req, res) => {
  // const result = await evaluateCmdSet(req.body.cmd, req.body.stdin);
  const result =falseEvaluate(req.body.cmd, req.body.stdin);
  storeCmdSet(result);
  res.status(201).json(result);
})

apiRouter.get(`/BrowseCmdSet`, async (req, res) => {
  const result = await getAllCmdSets();
  res.status(200).json(result);
})

// Auth
// createAuthorization from the given credentials
apiRouter.post('/auth/create', async (req, res) => {
  if (await getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);
    setAuthCookie(res, user.token);
    res.send({
      id: user._id,
    });
  }
});

// loginAuthorization from the given credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// getMe for the currently authenticated user
apiRouter.get('/user/me', async (req, res) => {
  const authToken = req.cookies['token'];
  const user = await userColl.findOne({ token: authToken });
  if (user) {
    res.send({ email: user.email });
    return;
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// Return the application's default page if the path is unknown
// Does omitting the first parameter default to * ?
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


// WebSocket
// Handle the protocol upgrade from HTTP to WebSocket
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, function done(ws) {
    wss.emit('connection', ws, request);
  });
});

// Keep track of all the connections so we can forward messages
let connections = [];

wss.on('connection', (ws) => {
  const connection = { id: connections.length + 1, alive: true, ws: ws };
  connections.push(connection);
  connections.forEach((c) => { console.log(`Connection: ${c.id}`) })

  // Forward messages to everyone except the sender
  ws.on('message', function message(data) {
    connections.forEach((c) => {
      if (c.id !== connection.id) {
        c.ws.send(`${data}`);
      }
    });
  });

  // Remove the closed connection so we don't try to forward anymore
  ws.on('close', () => {
    connections.findIndex((o, i) => {
      if (o.id === connection.id) {
        connections.splice(i, 1);
        return true;
      }
    });
  });

  // Respond to pong messages by marking the connection alive
  ws.on('pong', () => {
    connection.alive = true;
  });
});

// Keep active connections alive
setInterval(() => {
  connections.forEach((c) => {
    // Kill any connection that didn't respond to the ping last time
    if (!c.alive) {
      c.ws.terminate();
    } else {
      c.alive = false;
      c.ws.ping();
    }
  });
}, 10000);


// Auth helpers
function getUser(email) {
  return userColl.findOne({ email: email });
}

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userColl.insertOne(user);

  return user;
}

function setAuthCookie(res, authToken) {
  res.cookie('token', authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}


// Cmdset processing

// Sadly I don't think I have time to address
// the security issues with this app in a robust fashion.
// During development, I'll have endpoints call a bogus
// evaluation function instead. 
function falseEvaluate(cmd, stdin) {
  const stdout = `Given cmd:\n${cmd}\n\nGiven stdin:\n${stdin}`;
  const stderr = `Due to security concerns, this site does not currently execute user input :)`;
  return {cmd: cmd, stdin: stdin, stdout: stdout, stderr: stderr}
}

function isSafeCmd(cmd, stdin) { return true; }

async function evaluateCmdSet(cmd, stdin) {
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


// Database helpers
async function storeCmdSet(cmdset) {
  return await cmdColl.insertOne(cmdset);
}

async function getAllCmdSets() {
  const result = cmdColl.find();
  return result.toArray();
}

// Need to id cmdsets so I can request remove update specific cmdsets.