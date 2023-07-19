const adhaarSchema = require("../Model/Adhaar.js");
const ObjectId = require("mongodb").ObjectId;

const createAdhaar = async (adhaarNumber, name, dob, fatherName, gender) => {
  const adhaar = new adhaarSchema({
    name: name,
    dob: dob,
    fatherName: fatherName,
    gender: gender,
    adhaarNumber: adhaarNumber,
  });

  try {
    const savedWord = await adhaar.save();
    return adhaar._id;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const editAdhaar = async (
  adhaarID,
  adhaarNumber,
  name,
  dob,
  fatherName,
  gender
) => {
  await adhaarSchema
    .findOneAndUpdate(
      { _id: adhaarID },
      {
        name: name,
        dob: dob,
        fatherName: fatherName,
        gender: gender,
        adhaarNumber: adhaarNumber,
      }
    )
    .then((err, result) => {
      if (err) return err;
      return result;
    });
};

const getAdhaar = async (id) => {
  let mongoId = new ObjectId(id);
  console.log(mongoId);
  return await adhaarSchema.findOne({ _id: mongoId }).then(function (doc) {
    if (!doc) {
      return {};
    }
    return doc;
  });
};

module.exports = { createAdhaar, editAdhaar, getAdhaar };
