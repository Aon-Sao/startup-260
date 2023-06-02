## Git
Workflow is pull → work → add → commit → pull → push

## Markdown
GitHub's guide can be found [here](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

## Environments
Production is the server, deploy using a shell script, develop and test locally.

## Server
[http://52.45.233.47/](http://52.45.233.47/)
ssh -i /home/lars/keys/260awskeypairname.pem ubuntu@52.45.233.47

### Certificates
Needed for HTTPS. Let's Encrypt generates certificates. Caddy interfaces with that on my behalf. 

# Writing a Pitch
Lead with the motivation (what's the problem)
Give brief overview of the solution
Ask for money?

# Browsing local files
Is insecure, prefer to load over HTTPS. Serve it on localhost instead.

# HTML
`<!DOCTYPE html>` specifies HTML version 5, allowing the browser to not load a bunch of compatibilities.
The browser turns the HTML into a tree, the DOM, Document Object Model, and renders that.

A div takes up the whole width of the page
A span is inline, only as wide as the content
Try to be semantically expressive with choice of element, don't just use div
This is a way to label things:
```html
<figure>
<figcaption></figcaption>
<!-- content -->
</figure>
```

# CSS
The browser has a baseline stylesheet that I might want to delete, so that my css looks the same on all browsers.
Use @media to switch to column layout if mobile. Use a framework, like bootstrap or tailwind
`<img src="">` not `<img href="">`

# JS
I'll have event listeners and invoke grep, awk, sed from JS.
Don't forget the join method...
Let or const, don't var. Use ===
falsy: 0, -0, '', NaN, null, undefined
truthy: ¬falsy
Arrow functions
```javascript 
const arrow = () => 1;
const arrowWithReturn = (a) => {
    return a;
};

function sayHello() {
    console.log("hello");
}
```

A closure is a function + information from a factory which produced it. This is just HOF from cs111.
There are actually some cool array operators
f-strings are called template literals, use backticks and ${}
`console.log(\`DEBUG: ${var_name}\`)`
Instead of chaining || or && you can chain ?? which is the 'nullish' operator, which looks for non-nulls.
Use of to iterate from an array, use in to iterate properties of an object
spread operator is ... used to extend lists but at any position
rest/variadic is also ... but packs things into it
can console.log(x.y?.()); where ? is checking if y is nullish.
generators use yield, iterators don't, write a loop based on of or in
destructuring is just multiple assignment like x, y, z = *['a', 'b', 'c']
JS only allows single value return, so you destructure to get them all out
JSON.stringify() makes jsons, JSON.parse() takes 'em back in
json doesn't keep object methods, those are lost.
'use strict' at top of file changes some behavior, probably wise to include
window contains document, the viewport, request stuff, etc.
to modularize js, export functions you want made available, then import them elsewhere
JS is single-threaded, so don't run anything for too long. Be asynchronous.
Web API can hold stuff in a pen until the call stack is ready for it
Promises
```javascript
new Promise(() => {})
```
A promise takes a function. It has type promise, it can have a state like pending, and a result.
States = {pending: running asynchronously, fulfilled: completed successfully, rejected: failed to complete}
```javascript
function callback(resolve, reject) {  // Passed a function for fulfilled state, and one for failed
    resolve('done');
}
const p = new Promise(callback);
p.then((result) => console.log(result));  // Result is set by the return of resolve
```
async/await are handy wrappers
See slides for good examples for promises


# DOM
Turns the html document into a tree
`document` is the root of the DOM
You can move through the DOM with JS, query selector is great (same as css selectors)
To insert, first make a child somewhere 'to the side' with document.createElement(), then attach it
at the appropriate location with parentElement.appendChild(). Don't just inject html, because you 
might be injecting unknown code. Danger danger danger, use the DOM methods. Unless you're really sure
that the string you're injecting isn't mutable. 

# Event handlers
`onclick='alert("clicked")'`
Pay attention to load order. Defer the script load.

# Origin
You can easily write a 'skimmer' website that stores the victim's credentials and still logs them in with a redirect.
Same origin only policy is too restrictive, it doesn't allow use of external resources (like Google fonts)
CORS, Crosss Origin Resource Sharing is the better solution.

# Service design
Make a sequence diagram for how the users will interact with the product. Use this to choose endpoints to create.
Leverage existing infrastructure, use transfer protocol verbs, work with the conventions to be compatibile.

# Endpoint design
API and endpoints are similar terms.
The endpoints should be grammatical--name them after some noun or resource or action.
They should be readable like `/store/provo/order/28502`
K.I.S.S, one endpoint does one thing.
Document (OpenAPI)

# Remote Procedure Call (RPC)
Sometimes people just POST a function, other times they POST rpc and pass a field with the function.

# Representational State Transfer (REST)
Use HTTP verb as much as possible

# GraphQL
Single endpoint, nice query language, sounds flexible, could have performance and auth problems

# Node.js
NVM is the Node version manager
Node is the JS runtime
NPM is the Node package manager
For this class use the lts version of Node

# Express 
Install packages with NPM
Require package in JS
Define middleware with `express().use`, `.get`, etc. end with `.listen(<PORT>)`
For example to define an endpoint handling GET requests to `/store/prove`:
```javascript
app.get('/store/provo', (req, res, next) => {
  res.send({name: 'provo'});
});
```
The path parameter supports globbing and regex, and the callback function parameter is invoked when the path pattern is matched.
The callback takes three arguments, `req`uest, `res`ponse, and `next` (which routes to another function if desired).
`req.params` gets you the request parameters. 
If we define functions A and B, in that order, where both match the given path, then A will be executed first and receive B as the argument for `next`.


# Database
MySQL: Relational queries, jack of all trades
MongoDB: JSON objects
There are many others
Use the right flavor for the job.
MongoDB collections are arrays of JSON objects.

# Authentication
Don't store plaintext, store a one-way hash
Hashing algorithms are common, and people can lookup common password hashes in your DB.
Salt your hashes
Set a cookie with an authentication cookie
