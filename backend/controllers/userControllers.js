import {catchAsyncErrors} from '../middlewares/catchAsync.js/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/error.js';
import {User} from '../models/userSchema.js';
import {v2 as cloudinary} from 'cloudinary';

export const register=catchAsyncErrors(async(req,res)=>{
    const {
        name,
        email,
        phone,
        address,
        password,
        role,
        firstNiche,
        secondNiche,
        thirdNiche,
        coverLetter
    }=req.body;

    // Check if all fields are filled
    if(!name||!email||!phone||!address||!password||!firstNiche||!secondNiche||!thirdNiche||!coverLetter||!role){
        return next(new ErrorHandler('Please fill in all fields',400));
    }
    // Check if role is Jok Seeker and niches are not filled
    if(role=='Jok Seeker'&&(!firstNiche||!secondNiche||!thirdNiche||!coverLetter)){
        return next(new ErrorHandler('Please provide your preferred niches',400));
    }
// Check if user already exists
    const existingUser=await User.findOne({email});
    if(existingUser){
        return next(new ErrorHandler('User already exists',400));
    };
// Register User
    const userData=await User.create({
        name,
        email,
        phone,
        address,
        password,
        role,
        niches:{
            firstNiche,
            secondNiche,
            thirdNiche
        },
        coverLetter
    });
// Upload Resume
    if(req.files && req.files.resume){
        const {resume}=req.files;
        if(resume){
            try{
                // Upload resume to cloudinary
                const cloudinaryResponse=await cloudinary.uploader.upload(resume.tempFilePath,{
                    folder:'resumes',
                    resource_type:'raw'
                });
                if(!cloudinaryResponse){
                    return next(new ErrorHandler('Error uploading resume to cloud',500));
                }
                // Add resume to user data
                userData.resume={
                    public_id:cloudinaryResponse.public_id,
                    url:cloudinaryResponse.secure_url
                }

            const user=await User.create(userData);
            res.status(201).json({
                success:true,
                message:'Account Registered Successfully',
            });
        }
            // Catch error if resume upload fails
            catch (error){
                return next(new ErrorHandler('Error uploading resume to cloud',500));
            }
        }
    }

    res.status(201).json({
        success:true,
        message:'Account Registered Successfully',
    });
});