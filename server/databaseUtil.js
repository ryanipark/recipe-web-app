const express = require('express')
const sqlite3 = require('sqlite3').verbose()

/* * *     Utility functions for the database     * * */

//     Grab a connection from the database     //
function dbConnect() {
    const dbConnect = new sqlite3.Database('database.db' , sqlite3.OPEN_READWRITE, (err) => {
        if(err)
        {
            return console.error(err.message);
        }
        else
        {
            console.log("DATABASE: Connected successfully");
        }
    });
    return dbConnect;
}

 
module.exports = {
    dbConnect
}