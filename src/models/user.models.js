import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const userSchema = new Schema(
    {
        username:{
            type:String,
            lowercase:true,
            unique: true,
            required: [true, 'Please provide a username'],
            trim : true,
            index: true,
        },
        email:{
            type:String,
            lowercase:true,
            unique: true,
            required: [true, 'Please provide a username'],
            trim : true,
            index: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        avatar: {
            type: String, // cloudinary url
            required: true,
        },
        coverImage: {
            type: String, // cloudinary url
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        }

    },
    {
        timestamps:true
    }
)



//pre save middleware to hash the password before saving to the database
// it only runs when the password field is being updated
//next() will run the next middleware in the chain
//10 is the salt rounds for bcrypt
userSchema.pre('save', async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next()
})



userSchema.methods.isPasswordCorrect = async function(password)
{
    return await bcrypt.compare(password, this.password);
}


userSchema.method.genrateAccessToken = function(){
    return jwt.sign(
        {
            id: this._id,
            username: this.username,
            email: this.email,
            fullName: this.fullName,
        },
        process.env.ACESSS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACESSS_TOKEN_EXPIRY
        }
    )
}

userSchema.method.genrateRefreshToken = function(){
    return jwt.sign(
        {
            id: this._id,
        },
        process.env.REFERESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User", userSchema)