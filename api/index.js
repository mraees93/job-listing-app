const express = require("express");
const app = express();
const port = 5000;

var redis = require("redis");
    client = redis.createClient();
const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);  //converts clent.get function to a promise

app.get("/jobs", async (req, res) => {
    const jobs = await getAsync("github");
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    console.log(JSON.parse(jobs).length);
    // to retuen the jobs
    return res.send(jobs)
});

app.listen(port, () => 
console.log(`listening on port ${port}`));