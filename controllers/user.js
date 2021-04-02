const User = require("../models/user");
const Profile = require("../models/profile");

exports.Create = async (req, res, next) => {
  try {
    const data = await User.create(req.body);

    res.status(200).json({
      success: true,
      message: "Successfully create a user!",
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.GetAll = async (req, res, next) => {
  try {
    const data = await User.find()
      .select("name profiles")
      .populate("profiles", "age");

    res.status(200).json({
      success: true,
      message: "Successfully get all user!",
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.GetAllAggregation = async (req, res, next) => {
  try {
    let aggregateArr = [
      { $match: { name: "firmen" } },
      {
        $lookup: {
          from: "profiles",
          localField: "profiles",
          foreignField: "_id",
          as: "profiles",
        },
      },
      { $unwind: "$profiles" },
    ];

    const data = await User.aggregate(aggregateArr);

    res.status(200).json({
      success: true,
      message: "Successfully get all user!",
      data,
    });
  } catch (err) {
    next(err);
  }
};
