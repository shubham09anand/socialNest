const cron = require('node-cron');
const axios = require('axios');

const scheduleCronJob = () => {
  // Schedule a job to run every minute (adjust as needed)
  cron.schedule('* * * * *', async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8080/auth/processScheduledMessage');
      console.log('Cron job executed successfully:', response.data); // Log the response data
    } catch (error) {
      console.error('Error executing cron job:', error.message || error); // Log the error message
    }
  });
};

module.exports = { scheduleCronJob };
