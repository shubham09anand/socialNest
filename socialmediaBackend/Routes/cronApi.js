const cron = require('node-cron');
const axios = require('axios');
const dotenv = require("dotenv");
dotenv.config();

const scheduleCronJob = () => {
  // Schedule a job to run every minute (adjust as needed)
  cron.schedule('* * * * *', async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_CRONJOB_NETWORK}/auth/processScheduledMessage`);
      console.log('Cron job executed successfully:', response.data); // Log the response data
    } catch (error) {
      console.error('Error executing cron job:', error.message || error); // Log the error message
    }
  });
};

module.exports = { scheduleCronJob };
