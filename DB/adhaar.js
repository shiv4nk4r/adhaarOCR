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
    const savedWord = await word.save();
    return { adhaar: adhaar._id };
  } catch (err) {
    return { adhaar: null };
  }
};

const editAdhaar = () => {};

module.exports = { createAdhaar };
