const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/users");
const cardRouter = require("./routes/cards");
const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");

const PORT = 3000;
const NOT_FOUND_ERROR = 404;

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/signin", login);
app.use("/signup", createUser);

app.use(auth);

app.use("/users", userRouter);
app.use("/cards", cardRouter);

app.use("/", (req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: "Неверный адрес" });
});

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
