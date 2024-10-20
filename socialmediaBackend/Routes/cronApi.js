const cron = require('node-cron');
const axios = require('axios');
const dotenv = require("dotenv");
dotenv.config();

const scheduleCronJob = () => {
  // Schedule a job to run every minute (adjust as needed)
  cron.schedule('* * * * *', async () => {
    try {
      // const response = await axios.post(`http://192.168.1.7:8080/auth/processScheduledMessage`);

      const response = await axios.post(`https://apisocialnest.shubham09anand.in/auth/processScheduledMessage`);
      console.log('Cron job executed successfully:', response.data);
    } catch (error) {
      console.error('Error executing cron job:', error.message || error);
    }
  });
};

module.exports = { scheduleCronJob };
