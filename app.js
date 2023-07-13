const express = require("express");
const app = express();
const port = 3333;

const OCRController = require("./Controller/OCR.js");
const multer = require("multer");

const upload = multer({
  dest: "/mnt/c/Users/shiva/Downloads/tempUpload",
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

app.post("/ocr", upload.single("file"), OCRController.OCRFunction);

app.listen(port, () => console.log(`Server started on ${port}`));
