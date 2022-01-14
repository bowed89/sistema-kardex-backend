const { Pool } = require("pg");
const con = new Pool({
    user: "postgres",
    host: "localhost",
    password: "postgres",
    database: "db_sdp",
    port: "5433",
});

module.exports = con; 


/* const { Pool } = require("pg");

const con = new Pool({
    user: "jlopez",
    host: "10.10.10.39",
    password: "5zZ8kxMuWc",
    database: "db_evapost2021",
    port: "5432",
});

module.exports = con;  
 */