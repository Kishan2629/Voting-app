const express = require("express");
const bodyParser = require("body-parser");
const pool = require("./db");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Voting endpoint
app.post("/vote", async (req, res) => {
  const choice = req.body.choice;
  if (choice === "A" || choice === "B") {
    await pool.query("INSERT INTO votes (choice) VALUES ($1)", [choice]);
  }
  res.redirect("/results");
});

// Results endpoint
app.get("/results", async (req, res) => {
  const result = await pool.query(`
    SELECT choice, COUNT(*) as count
    FROM votes
    GROUP BY choice
  `);
  res.json(result.rows);
});

app.get("/", (req, res) => {
  res.send(`
    <h1>Vote Demo</h1>
    <form action="/vote" method="POST">
      <button name="choice" value="A">Vote Option A</button>
      <button name="choice" value="B">Vote Option B</button>
    </form>
    <p>Check results at <a href="/results">/results</a></p>
  `);
});

app.listen(port, () => {
  console.log(`Voting app running at http://localhost:${port}`);
});
