// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// ───────────────────────────────────────────────────────────
// Cas 1 : /api  → date absente  ➜ retourne l’heure courante
// ───────────────────────────────────────────────────────────
app.get("/api", (req, res) => {
  const now = new Date();
  return res.json({
    unix: now.getTime(),
    utc: now.toUTCString(),
  });
});

// ───────────────────────────────────────────────────────────
// Cas 2 : /api/:date  → date présente
// ───────────────────────────────────────────────────────────
app.get("/api/:date", (req, res) => {
  const { date } = req.params;
  let dateObj;

  // Nombre pur → timestamp (ms ou s)
  if (/^\d+$/.test(date)) {
    const ts = date.length === 13 ? Number(date) : Number(date) * 1000;
    dateObj = new Date(ts);
  } else {
    dateObj = new Date(date);
  }

  if (dateObj.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: dateObj.getTime(),
    utc: dateObj.toUTCString(),
  });
});

// ───────────────────────────────────────────────────────────

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
