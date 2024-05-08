import { asynchandler } from "../utils/asynchandler.js";

import { User } from "../models/user.model.js";

import { uploadOnCloudinary } from "../utils/fileupload.js";

const registerUser = asynchandler(async (req, res) => {
  // get user details from frontend
  // validation - non empty
  // check if user already exist :username ,email
  // check for images,check for avator
  // upload then to cloudinary,
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return response

  const { fullname, email, username, password } = req.body;

  if (
    [fullname, email, password, username, password].some((field) => {
      field?.trim() === "";
    })
  ) {
    throw new res.send({
      message: "All The Fields are required",
    });
  }
  const existedUser = User.findOne({
    $or: [{ email }, { username }],
  });
  if (existedUser) {
    return res.send({
      message: "User already Exist",
      status: 409,
    });
  }

  console.log(req.files);

  const avartarLocalPath = req.files?.avatar[0]?.path;

  const coverimageLocalPath = req?.files?.coverimage[0]?.path;

  //check if avatar is in local path

  if (!avartarLocalPath) {
    return res.send({
      message: "Avatar image is required",
    });
  }

  const avatar = await uploadOnCloudinary(avartarLocalPath);
  const coverImage = await uploadOnCloudinary(coverimageLocalPath);

  if (!avatar) {
    return res.send({
      message: "Avatar image is required",
    });
  }

  //data entry

  const user = await User.create({
    fullname,
    avatar: avatar?.url,
    coverImage: coverImage?.url ? coverImage?.url : " ",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user?._id).select(
    "-password - refreshtoken"
  );

  if (!createdUser) {
    return res.sign({
      message: "Something went wrong while registering the user",
      status: 500,
    });
  } else {
    return res.status(200).json({
      user,
    });
  }
});

export { registerUser };
