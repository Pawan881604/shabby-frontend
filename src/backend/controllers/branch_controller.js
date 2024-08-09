const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const branch_model = require("../models/branch_model");
const { generateRandomString } = require("../utils/generateRandomString");
const ApiFetures = require("../utils/apiFeatuers");

exports.add_branch = catchAsyncError(async (req, res, next) => {
  const { branch_data, uuid } = req.body;
  const { phone, branch } = branch_data;
  const random_id = generateRandomString(8);
  const isexist = await branch_model.findOne({ phone_number: `+91${phone}` });
  if (isexist) {
    return next(new ErrorHandler("Try with another phone number", 400));
  }
  const data = {
    phone_number: `+91${phone}`,
    branch: branch,
    branch_id: `bnh_${random_id}${uuid}`,
  };
  const branch_ = await branch_model.create(data);
  const all_branch = await branch_model.find();
  const data_rev = all_branch.reverse();

  res.status(200).json({
    success: true,
    branch: data_rev,
  });
});

exports.get_all_branch = catchAsyncError(async (req, res, next) => {
  const resultPerpage = 10;
  const count_branch = await branch_model.countDocuments();

  const apiFetures = new ApiFetures(branch_model.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerpage);

  const branch = await apiFetures.query;
  res.status(200).json({
    success: true,
    branch,
    count_branch,
    resultPerpage,
  });
});

exports.update_branch = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { branch_data } = req.body;
  const { phone, branch } = branch_data;
  const data = {
    phone_number: phone,
    branch: branch,
  };
  const branch_ = await branch_model.findOneAndUpdate({ branch_id: id }, data, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  if (branch_) {
    branch_.update_at = new Date(); // No need for await here
    await branch_.save(); // Save changes, if necessary
  }

  const all_branch = await branch_model.find();
  const all_data = all_branch.reverse();
  res.status(200).json({
    success: true,
    branch: all_data,
  });
});
