require('dotenv').config();
//const express = require('express');
//const app = express();
const Server = require('../models/server');

const server = new Server();
server.listen();