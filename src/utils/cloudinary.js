import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';  //file system module

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  
    api_key: process.env.CLOUDINARY_API_KEY,   
    api_secret: process.env.CLOUDINARY_API_SECRET, 
});


const uploadOnCloudinary = async(localFilePath)=>{
    try{
        if(!localFilePath){
            return null;
        } // upload file to cloudinary
       const res = await cloudinary.uploader.upload(localFilePath,{
        //resource type: 'auto' means cloudinary will automatically determine the image type from the file extension.
            resource_type:"auto"

        })
        // file has been uploaded successfully
        console.log("File uploaded successfully to cloudinary",res.url);
        return res
    }catch(error){
        fs.unlinkSync(localFilePath); // delete the local file if error occurs
        return null;
    }
}

export {uploadOnCloudinary}