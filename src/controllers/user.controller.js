import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req,res)=>{
   //get user details from frontend
   // valiadation - not empty
   // check if user already exists : username and email
   //check for images , check for avatar
   //upload them to cloudinary , avatar 
   //create user object - create entry in db
   //remove password and refresh token from response body
   //check for user correction
   // return res


//    get user details from frontend
   const {email,password,fullname,username} = req.body
   console.log("email:", email)

   // validation - not empty
   // if user fields are empty then trim that empties and check again and throw error
   if(
    [fullname,email,username,password].some((field)=>
        field?.trim() === "")
    ) {
        throw new ApiError(   400 ,"All fields are required")
    }

    // check if user already exists : username and email
    const exisitingUser = User.findOne({
        $or : [{ username },{ email }]
    })
    if (exisitingUser) {
        throw new ApiError(409, "User already exists")
    }


   

    //check for images , check for avatar

     // files - multer method middleware will have uploaded the files to req.files
    // avatar - first file from array of files from multer
    //path - path of the uploaded file to cloudinary , check multer middleware for path
    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar is required")
    }

        //upload them to cloudinary , avatar 
   const avatar =  await uploadOnCloudinary(avatarLocalPath)
   const coverImage =  await uploadOnCloudinary(coverImageLocalPath)


   if(!avatar){
    throw new ApiError(400, "Avatar is required")
   }

   //create user object - create entry in db
   const user =  await User.create({
    fullname,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    username,
    password:username.toLowerCase(), // convert username to lowercase
   })

   //remove password and refresh token from response body
   //select 
   const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
   )

     //check for user correction
   if(!createdUser){
    throw new ApiError(500, "something went wrong while creating user")
   }

    // return res
    return res.status(201).json(
        new ApiResponse(201, createdUser,"User registered successfully")
    )


      
})


export { registerUser }



