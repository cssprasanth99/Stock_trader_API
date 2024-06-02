const express = require("express");
const server = express();
const PORT = 4500;
const fs = require("fs");
const path = require("path");

server.use(express.json());

server.get("/trades", (req, res) => {
  const stocks = JSON.parse(
    fs.readFileSync(path.join(__dirname, "db.json"), "utf-8") // Reads
  );
  res.send(stocks);
});

server.post("/trades", (req, res) => {
  const stocks = JSON.parse(
    fs.readFileSync(path.join(__dirname, "db.json"), "utf-8")
  );
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
