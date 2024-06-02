const express = require("express");
const server = express();
const PORT = 4500;
const fs = require("fs");
const path = require("path");

server.use(express.json());

server.get("/trades", (req, res) => {
  const stocks = JSON.parse(
    fs.readFileSync(path.join(__dirname, "db.json"), "utf-8") // Reads file in database
  );
  res.status(200).send(stocks); // sends response on client's request
});

server.post("/trades", (req, res) => {
  const stocks = JSON.parse(
    fs.readFileSync(path.join(__dirname, "db.json"), "utf-8") // gets data from json server
  );

  let newStock = req.body; // get new stock data from client request

  let maxId =
    stocks.trades.length > 0
      ? Math.max(...stocks.trades.map((stock) => stock.id))
      : 0; // knowing what is the highest id and storing it in maxId

  newStock.id = maxId + 1; // for newStock we are updating it with incrementing by 1 to id

  // console.log(newStock.id);

  stocks.trades.push(newStock); //puhsing new stocks into the stocks array

  fs.writeFileSync(
    path.join(__dirname, "db.json"),
    JSON.stringify(stocks, null, 2),
    "utf-8"
  ); // again writing whole array to JSON server with updated stock;

  // console.log(stocks);

  res.status(201).send("Stocks are received"); // sending success message to client
});




server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
