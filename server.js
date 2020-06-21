// npm i nodemon -D (dev dependency)
// npm i nodemon -g (global)
// run node - node server.js

// require node core module
const http = require('http');

// import local files

// require npm module
const express = require('express');


const app = express();

const usersRoute = require('./routes/users');

// parse http body with content type applications/json
app.use(express.json())

// create http server instance
const server = http.createServer(app);

// use middleware (users route)
app.use('/users', usersRoute);

// run server on port 4000
server.listen(4000, function () {
	console.log('server work on port 4000');
});
