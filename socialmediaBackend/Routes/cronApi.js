const cron = require('node-cron');
const axios = require('axios');

const scheduleCronJob = () => {
  cron.schedule('* * * * *', async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_CRONJOB_NETWORK;
      const response = await axios.post(`${apiUrl}/auth/processScheduledMessage`);
      console.log(`${apiUrl}/auth/processScheduledMessage`)
    } catch (error) {
      console.error('Error executing cron job:', error);
    }
  });
};

module.exports = { scheduleCronJob };