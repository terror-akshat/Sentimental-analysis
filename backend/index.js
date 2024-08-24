const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const Sentiment = require("sentiment");
const sentiment = new Sentiment();

app.post("/analyze", (req, res) => {
  const { text } = req.body;
  const result = sentiment.analyze(text);
  const sentimentScore = result.score;
  let sentimentLabel;

  if (sentimentScore > 0) {
    sentimentLabel = "Positive";
  } else if (sentimentScore < 0) {
    sentimentLabel = "Negative";
  } else {
    sentimentLabel = "Neutral";
  }

  res.json({ sentiment: sentimentLabel });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is serving on port ${PORT}`);
});
