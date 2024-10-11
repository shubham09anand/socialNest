const cron = require('node-cron');
const axios = require('axios');
const dotenv = require("dotenv");
dotenv.config();

const scheduleCronJob = () => {
  // Schedule a job to run every minute (adjust as needed)
  cron.schedule('* * * * *', async () => {
    try {
      const response = await axios.post(`http://13.202.210.238:8080/auth/processScheduledMessage`);
      console.log('Cron job executed successfully:', response.data);
    } catch (error) {
      console.error('Error executing cron job:', error.message || error);
    }
  });
};

module.exports = { scheduleCronJob };
