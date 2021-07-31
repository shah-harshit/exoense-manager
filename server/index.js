const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.use("/transactions", require("./routes/transactions"));

const PORT = process.env.PORT || 5000;

/* app.get("/", function (req, res) {
  res.send("Hello World");
}); */

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
