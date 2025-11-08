const express = require("express");
const client = require("prom-client");

const app = express();
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

const counter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
});

app.get("/api/hello", (req, res) => {
  counter.inc(); // count each request
  res.json({ message: "Hello, JMeter!" });
});

// expose metrics endpoint
app.get("/metrics", async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
