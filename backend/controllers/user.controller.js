import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import getDataUri from "../utils/datauri.js"
import cloudinary from "../utils/cloudinary.js"

export const register = async(req,res)=>{
    try {
        const {fullname,email,phoneNumber,password,role} = req.body
        if(!fullname || !email || !phoneNumber || !password  || !role){
            return res.status(400).json({
                message:'Something is missing',
                success:false
            })
        }
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                message:'User already exist with this email',
                success:false
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
        let newUser =  await User.create({
            fullname,
            email,
            phoneNumber,
            password:hashedPassword,
            role,
        })

        // cloudinary  
        const file = req.file
        if(file){
            const fileUri = getDataUri(file)
            const cloudResponse  = await cloudinary.uploader.upload(fileUri.content)
            newUser.profile.profilePhoto = cloudResponse.secure_url 
            await newUser.save()
        }
        return res.status(200).json({
            message:'Account created successfully',
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

export const login = async (req,res)=>{
    try {
        const {email,password,role} = req.body
        if(!email || !password  || !role){
            return res.status(400).json({
                message:'Something is missing',
                success:false
            })
        }
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                message:'Invalid credentials',
                success:false
            })
        }
        const passwordMatched = await bcrypt.compare(password,user.password) 
        if(!passwordMatched){
            return res.status(400).json({
                message:'Invalid credentials',
                success:false
            })
        }
        if(role!== user.role){
            return res.status(400).json({
                message:'Account doesn\'t exist with this role',
                success:false
            })    
        }

        const tokenData = {
            userId: user._id
        }

        user = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }

        const token = await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'})
        return res.status(200).cookie('token',token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:'Strict'}).json({
            message:`Welcome back ${user.fullname}`,
            user,
            success:true
        })
    } catch (error) {
        console.log(error)        
        return res.status(500).json({
            message: 'Server error',
            success: false,
        });
    }

}

export const logout = async(req,res)=>{
    try {
        return res.status(200).cookie('token','',{maxAge:0}).json({
            message:'Logged out successfully',
            success:true
        })
    } catch (error) {
        console.log(error)        
    }
} 

export const updateProfile = async(req,res)=>{
    try {
        const {fullname,email,phoneNumber,bio,skills} = req.body
        // cloudinary
        const file = req.file
        let cloudResponse
        if(file){
            const fileUri = getDataUri(file)
            cloudResponse = await cloudinary.uploader.upload(fileUri.content) 
        }

        const userId = req.id //from middleware
        let user  = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                message:'User not found',
                success:false
            })
        }
        // updating data
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber) user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills){
            let skillsArr = skills.split(',');
            user.profile.skills = skillsArr
        } 
        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url
            user.profile.resumeOriginalName = file.originalname
        }
        // resume 

        await user.save()
        user = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }
        return res.status(200).json({
            message:'Profile updated successfully',
            user,
            success:true
       })

    } catch (error) {
        console.log(error)
    }
}