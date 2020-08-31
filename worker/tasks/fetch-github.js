var fetch = require("node-fetch");
var redis = require("redis");
    client = redis.createClient();
const { promisify } = require("util"); 
const setAsync = promisify(client.set).bind(client);  //

const baseURL = "https://jobs.github.com/positions.json";

async function fetchGithub() {
    // setting result count to non zero 
    let resultCount = 1, onPage = 0;
    // empty array to hold all jobs it gets from api
    const allJobs = [];
    // while loop to run as long as its getting results and by increasing one page at a time
    // fetch all pages
    while(resultCount > 0) {
        const res = await fetch(`${baseURL}?page=${onPage}`);
        const jobs = await res.json();
        // putting the json(jobs) in the array
        allJobs.push(...jobs);
        resultCount = jobs.length;
        // logging how many jobs we get back
        console.log("got", resultCount, "jobs");
        // repeats till it runs into an empty page
        onPage ++;
    }

    console.log("got", allJobs.length, "jobs total")
    // filter algorithm
    const jrJobs = allJobs.filter(job => {
        const jobTitle = job.title.toLowerCase();
        // algorithm logic
        if(
            jobTitle.includes("senior") ||
            jobTitle.includes("manager") ||
            jobTitle.includes("sr.") ||
            jobTitle.includes("architect")
        ) {
            return false
        }
        return true;
    })

    console.log("filtered down to", jrJobs.length);

    // set in redis
    
    const success = await setAsync("github", JSON.stringify(jrJobs));

    console.log({success});
}

// fetchGithub();

module.exports = fetchGithub;