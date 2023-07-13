const tesseract = require("node-tesseract-ocr");
const path = require("path");
const fs = require("fs");
const Jimp = require("jimp");

// const handleError = (err, res) => {
//   res.status(500).contentType("text/plain").end("Oops! Something went wrong!");
// };

const OCRFunction = (req, res) => {
  const tempPath = req.file.path;
  Jimp.read(tempPath, (err, image) => {
    if (err) throw err;
    image.greyscale().write(tempPath);
  });
  //   if (path.extname(req.file.originalname).toLowerCase() === ".jpg") {
  //     fs.rename(tempPath, targetPath, (err) => {
  //       if (err) console.log(err);

  //       res.status(200).contentType("text/plain").end("File uploaded!");
  //     });
  //   }

  // Tesseract Data Handling
  const config = {
    lang: "eng",
    oem: 1,
    psm: 3,
  };
  // Recognize text of any language in any format
  const images = [tempPath];
  tesseract
    .recognize(images, config)
    .then((text) => {
      // Function to Parse the Data
      const { dob, number, name, gender, fatherName } = parseData(text);

      // Response Code
      if (number || name || dob || gender || fatherName) {
        res.status(200).send({
          data: {
            adhaarNum: number,
            name: name,
            dob: dob,
            gender: gender,
            father: fatherName,
          },
          status: "success",
        });
      } else {
        res.status(200).send({
          data: {
            adhaarNum: number,
            name: name,
            dob: dob,
            gender: gender,
            father: fatherName,
          },
          status: "error",
          message: "Unable to Read the Data",
        });
      }
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).send({ status: "error", message: error.message });
    });
};

const parseData = (text) => {
  let dob;
  let number;
  let name;
  let gender;
  let fatherName;
  console.log(text);
  text
    .split("\n")
    .filter((str) => !str.replace(/[^A-Z0-9]/gi, "") == "")
    .filter((data) => {
      if (
        /^\d{4}\s\d{4}\s\d{4}$/.test(
          data.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "").trim()
        )
      ) {
        number = data
          .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
          .trim();
      } else if (
        /^[a-zA-Z\s]*$/.test(data) &&
        !/India/.test(data) &&
        !/india/.test(data)
      ) {
        name = data;
        console.log(data, "Name");
      } else if (/DOB:/.test(data) || /DOB/.test(data)) {
        let index = 0;
        data.split(" ").forEach((str, i) => {
          if (/DOB:/.test(str) || /DOB/.test(str)) {
            index = str === "DOB:" ? i : i + 1;
            console.log(i, "DOB INDEX");
          }
        });
        dob = data.split(" ")[index + 1];
      } else if (/Father/.test(data)) {
        fatherName = data;
        let index = 0;
        data.split(" ").forEach((str, i) => {
          if (str === "Father") index = i;
        });
        fatherName = data
          .split(" ")
          .slice(index + 2, data.split(" ").length)
          .join(" ");
      } else {
        data.split(" ").forEach((str) => {
          if (
            /(?:m|M|male|Male|f|F|female|Female|FEMALE|MALE|Not prefer to say)$/.test(
              str
            )
          )
            gender = str;
        });
      }
    });

  return { dob, number, name, gender, fatherName };
};

module.exports = { OCRFunction };
