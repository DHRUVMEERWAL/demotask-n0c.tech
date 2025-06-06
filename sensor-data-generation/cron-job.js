const cron = require('node-cron');
const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

const BUCKET_NAME = process.env.BUCKET_NAME;
const RAW_FILE = 'raw_data/raw_data.json';
const PROCESSED_FILE = 'processed_data/avg_result.json';

function generate30DaysSensorData() {
  const data = [];
  const now = Date.now();
  const intervalMs = 5 * 60 * 1000;
  const totalEntries = 8640;

  for (let i = 0; i < totalEntries; i++) {
    data.push({
      temperature: parseFloat((20 + Math.random() * 15).toFixed(2)),
      pressure: parseFloat((980 + Math.random() * 40).toFixed(2)),
      timestamp: new Date(now - i * intervalMs).toISOString(),
    });
  }

  return data.reverse();
}

async function uploadRawData() {
  const dummyData = generate30DaysSensorData();

  try {
    await s3.putObject({
      Bucket: BUCKET_NAME,
      Key: RAW_FILE,
      Body: JSON.stringify(dummyData),
      ContentType: 'application/json',
    }).promise();

    console.log(`Uploaded ${dummyData.length} entries to raw_data.json`);
  } catch (err) {
    console.error('Error uploading dummy raw data:', err);
  }
}

function average(entries) {
  const valid = entries.filter(d => d.temperature && d.pressure);
  const avgTemp = valid.reduce((sum, d) => sum + d.temperature, 0) / valid.length;
  const avgPressure = valid.reduce((sum, d) => sum + d.pressure, 0) / valid.length;
  return {
    avgTemperature: avgTemp.toFixed(2),
    avgPressure: avgPressure.toFixed(2),
  };
}

function getHourlyData(data, hours) {
  const now = Date.now();
  const result = [];
  for (let i = 0; i < hours; i++) {
    const start = now - (i + 1) * 60 * 60 * 1000;
    const end = now - i * 60 * 60 * 1000;
    const entries = data.filter(d => {
      const t = new Date(d.timestamp).getTime();
      return t >= start && t < end;
    });
    if (entries.length > 0) {
      result.unshift({
        timestamp: new Date(start).toISOString(),
        ...average(entries),
      });
    }
  }
  return result;
}

function getDailyData(data, days) {
  const now = Date.now();
  const result = [];
  for (let i = 0; i < days; i++) {
    const start = now - (i + 1) * 24 * 60 * 60 * 1000;
    const end = now - i * 24 * 60 * 60 * 1000;
    const entries = data.filter(d => {
      const t = new Date(d.timestamp).getTime();
      return t >= start && t < end;
    });
    if (entries.length > 0) {
      result.unshift({
        date: new Date(start).toISOString().split('T')[0],
        ...average(entries),
      });
    }
  }
  return result;
}

async function processSensorData() {
  try {
    const rawData = await s3.getObject({
      Bucket: BUCKET_NAME,
      Key: RAW_FILE,
    }).promise();

    const data = JSON.parse(rawData.Body.toString());

    const lastHour = data.slice(-12); // last 12 entries (5-min intervals)
    const last24h = getHourlyData(data, 24);
    const last7d = getDailyData(data, 7);
    const last30d = getDailyData(data, 30);

    const result = {
      lastHour,
      last24h,
      last7d,
      last30d,
      processedAt: new Date().toISOString(),
    };

    await s3.putObject({
      Bucket: BUCKET_NAME,
      Key: PROCESSED_FILE,
      Body: JSON.stringify(result, null, 2),
      ContentType: 'application/json',
    }).promise();

    console.log('Processed averages uploaded to S3');
  } catch (err) {
    console.error('Error processing sensor data:', err);
  }
}

cron.schedule('*/5 * * * *', async () => {
  console.log('Running scheduled raw data generation and processing...');
  await uploadRawData();
  await processSensorData();
});
