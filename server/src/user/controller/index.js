const User = require("../models/User");

const CompleteSignup = async (
  userID,
  phoneNumber,
  dob,
  gender,
  specialization,
  registrationNo,
  registrationYear,
  stateCouncil,
  qualification,
  college,

  clinicName,
  street,
  city,
  state,
  country,
  pincode
) => {
  try {
    const user = await User.findById({ userID });
    user.generalData = {
      phoneNumber,
      dob,
      gender,
    };

    user.doctorData = {
      specialization,
      registrationNo,
      registrationYear,
      stateCouncil,
      qualification,
      college,
      clinic: {
        clinicName,
        street,
        city,
        state,
        country,
        pincode,
      },
    };

    await user.save();
  } catch (err) {
    throw err;
  }
};

module.exports = { CompleteSignup };
