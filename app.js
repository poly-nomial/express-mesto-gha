const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRouter = require("./routes/users.js");
const cardRouter = require("./routes/cards.js");

const PORT = 3000;

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: "6384c2f5d0e67b329139c3c4",
  };

  next();
});
app.use("/users", userRouter);
app.use("/cards", cardRouter);

mongoose.connect(
  "mongodb://localhost:27017/mestodb",
  {
    useNewUrlParser: true,
  },
  () => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  }
);
