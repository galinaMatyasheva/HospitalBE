const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const apiRouter = require("./src/modules/routes/routes");
app.use(cors());
app.use(bodyParser.json());
app.use("/", apiRouter);

const uri =
  "mongodb+srv://galina:exceed123!@cluster0.gdsby.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(8080, () => {
  console.log("listen on 8080 port");
});
