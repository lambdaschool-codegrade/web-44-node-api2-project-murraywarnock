// require your server and launch it here
// const express = require('express');
const server = require('./api/server');
// const postsRoutes = require("./api/posts/posts-router");

// const server = express();

// server.use('/api/posts', postsRoutes);

// using port 9000 for this example
server.listen(9000, () => console.log('API running on port 9000'));