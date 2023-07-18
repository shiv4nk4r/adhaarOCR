const adhaarSchema = require("../Model/Adhaar.js");

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
  await adhaarSchema.findById(id).then((err, result) => {
    if (err) return err;
    return result;
  });
};

module.exports = { createAdhaar, editAdhaar, getAdhaar };
