require('dotenv').config({ path: '.env.production' });

const express = require("express");
const cors = require("cors"); 
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

const app = express();
const port = process.env.PORT1 || 3001;

// Enable CORS for your frontend origin
app.use(cors());

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

function streamToString(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
  });
}

const RANGE_KEYS = {
  "1h": "lastHour",
  "24h": "last24h",
  "7d": "last7d",
  "30d": "last30d",
};

app.get("/api/sensors", async (req, res) => {
  const { type, range } = req.query;

  if (!type || !["temperature", "pressure"].includes(type)) {
    return res.status(400).json({ error: "Invalid or missing 'type' parameter." });
  }

  const dataKey = RANGE_KEYS[range];
  if (!dataKey) {
    return res.status(400).json({ error: "Invalid 'range' parameter. Use 1h, 24h, 7d, or 30d." });
  }

  try {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: "processed_data/avg_result.json",
    });
    const response = await s3.send(command);
    const fileContent = await streamToString(response.Body);
    const parsedData = JSON.parse(fileContent);

    const entries = parsedData[dataKey];
    if (!entries || entries.length === 0) {
      return res.status(404).json({ error: "No data found for the given range." });
    }

    const labels = entries.map((entry) =>
      new Date(entry.timestamp || entry.date).toLocaleString()
    );
    const values = entries.map((entry) =>
      parseFloat(entry[type] || entry[`avg${capitalize(type)}`])
    );

    res.json({ labels, values });
  } catch (err) {
    console.error("Error reading from S3:", err);
    res.status(500).json({ error: "Failed to load sensor data from S3." });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Helper function
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
