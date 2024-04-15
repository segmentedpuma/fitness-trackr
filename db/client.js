const {Client} = require('pg');

const client = new Client('postgres://localhost:5432/fitness_tracker');

console.log("client connected");


module.exports = client;