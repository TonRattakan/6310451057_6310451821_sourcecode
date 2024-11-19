const mysql = require('mysql2');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: 'online_store',
    port: 3306,
});

con.connect(function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Connected!");
});

module.exports = con;