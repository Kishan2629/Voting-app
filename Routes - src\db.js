const express = require("express");
const router = express.Router();
const db = require("./db");

router.post("/vote", (req, res) => {
  const { option } = req.body;
  db.run("INSERT INTO votes(option) VALUES(?)", [option]);
  res.redirect("/");
});

router.get("/results", (req, res) => {
  db.all(
    "SELECT option, COUNT(*) AS count FROM votes GROUP BY option",
    [],
    (err, rows) => {
      res.json(rows);
    }
  );
});

router.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

module.exports = router;
