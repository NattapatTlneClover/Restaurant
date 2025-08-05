require('dotenv').config();
const { app, server } = require('./app');
const port = 8080;

server.listen(port, () => { console.log('Start erver at port ' + port) });