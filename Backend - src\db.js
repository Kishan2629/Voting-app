const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/", routes);

app.listen(port, () => {
  console.log(`Voting app running on port ${port}`);
});
