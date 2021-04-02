const Profile = require("../models/profile");
const User = require("../models/user");

exports.Create = async (req, res, next) => {
  try {
    let { user } = req.body;

    // cari profile yang usernya itu
    // cek kalau age yang di profile sama dengan age di req body
    // balikin error message, udh ada umur segitu

    // Validate Duplicate Profile
    let profileUser = await Profile.find({ user: user });
    let profileFound = profileUser.find((el) => el.age == req.body.age);
    // console.log(profileFound);
    if (profileFound) {
      return res.status(400).json({
        success: false,
        message: `Profile with age: ${req.body.age} is found!`,
      });
    }

    const profile = await Profile.create(req.body);

    // User save the profile id
    await User.findByIdAndUpdate(user, {
      $push: { profiles: profile._id },
    });

    res.status(201).json({
      success: true,
      message: "Successfully create a profile!",
      //   data: profile,
    });
  } catch (err) {
    next(err);
  }
};
