const cron = require('node-cron');
const axios = require('axios');

const scheduleCronJob = () => {
  cron.schedule('* * * * *', async () => {
    try {
      const response = await axios.post('http://13.202.210.238:8080/auth/processScheduledMessage');
    } catch (error) {
      console.error('Error executing cron job:', error);
    }
  });
};

module.exports = { scheduleCronJob };