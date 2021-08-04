// implement your server here
// require your posts router and connect it here
const express = require('express');
const postsRoutes = require("./posts/posts-router");

const server = express();
server.use(express.json());
server.use('/api/posts', postsRoutes);

server.use('/', (req, res) => res.send('API up and running!'));


// server.get("/", (req, res) => {
//     postsRoutes.getById
// })

module.exports = server;