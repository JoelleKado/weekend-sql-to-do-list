const pg = require('pg');


const url = require('url');
let config = {};



//get the Pool object from pg
const Pool = pg.Pool

//make our own instance of a Pool from that template Pool object
  //this says how to connect to the Db 

if (process.env.DATABASE_URL) {
  //running remote (heroku)
  config = {
    connectionString: process.env.DATABASE_URL,
    ssl: {rejectUnauthenticated: false}
  }

} else {
  //running locally
  

config = {
  database: 'weekend-to-do-app', 
  host: 'localhost', 
  port: 5432, 
  max: 10, 
  idleTimeoutMillis: 30000 
};
}

// create the pool with the proper config
const pool = new Pool(config);

pool.on("connect", () => {
  console.log("connected to postgres");
});

pool.on("error", (err) => {
    console.log("error connecting to postgres", err);
});

module.exports = pool;