const express = require("express");
const app = express();
const port = 3333;
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const OCRController = require("./Controller/OCR.js");
const multer = require("multer");

// Importing ENV variable
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
// Connecting to MongoDB Server
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection to mongoDB successful"))
  .catch((e) => console.log(`Could not connect to mongo.\n\n${e}`));

const upload = multer({
  dest: "/mnt/c/Users/shiva/Downloads/tempUpload",
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

app.post("/ocr", upload.single("file"), OCRController.OCRFunction);

app.post("/update", OCRController.updateAdhaar);

app.listen(port, () => console.log(`Server started on ${port}`));
