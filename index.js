const express = require("express");
const cors = require("cors");
const URL = require("./models/url");

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));
app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/shorturl", async function (req, res) {
  const url = req.body.url;
  if (!url) return res.json({ error: "invalid url" });

  const urlRegex = /^(http|https)(:\/\/)/;
  if (urlRegex.test(url)) {
    const id = await URL.countDocuments();
    await URL.create({
      original: url,
      short: id + 1,
    });
    const links = await URL.findOne({ original: url });
    res.json({ original_url: links.original, short_url: links.short });
  } else {
    res.json({ error: "invalid url" });
  }
});

// get url
app.get("/api/shorturl/:short_url", async function (req, res) {
  const short_url = req.params.short_url * 1;
  const link = await URL.findOne({ short: short_url });
  res.redirect(link.original);
});

require("dotenv").config();
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
