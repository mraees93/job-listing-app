var CronJob = require('cron').CronJob;
const fetchGithub = require("./tasks/fetch-github");

// to fetch github jobs
new CronJob('* * * * * *', fetchGithub, null, true, 'South_Africa/Cape_Town');
