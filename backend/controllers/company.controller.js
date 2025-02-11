import {Company} from '../models/company.model.js'
import cloudinary from '../utils/cloudinary.js';
import getDataUri from '../utils/datauri.js';

export const registerCompany = async (req,res)=>{
 try {
     const {companyName} = req.body;
    if(!companyName){
        return res.status(400).json({
            message:"Company name is required",
            success:false
        })
    }
    let company = await Company.findOne({companyName})
    if(company){
        return res.status(400).json({
            message:"Company name already exist",
            success:false
        })
    }
    company = await Company.create({
        companyName,
        userId:req.id
    })
    return res.status(200).json({
        message:"Company registered successfully",
        company,
        success:true
    })
 } catch (error) {
    console.log(error)
 }   
}

export const getCompanies = async(req,res)=>{
    try {
        const userId = req.id;
        const companies = await Company.find({userId})
        if(!companies){
            return res.status(400).json({
                message:"Companies not found",
                success:false
            })    
        }
        return res.status(200).json({
            companies,
            success:true
        })

    } catch (error) {
        console.log(error)
    }
}

export const getCompanyById = async(req,res)=>{
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId)
        if(!company){
            return res.status(400).json({
                message:"Company not found",
                success:false
            })    
        }
        return res.status(200).json({
            company,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateCompany = async (req,res)=>{
    try {
        const {companyName,description,website,location} = req.body
        // cloudinary
        const file = req.file;
        let logo
        if(file){
            const fileUri = getDataUri(file)
            const cloudResponse  = await cloudinary.uploader.upload(fileUri.content)
            logo = cloudResponse.secure_url
        }
        const updateDate = {companyName,description,website,location,logo}
        const company = await Company.findByIdAndUpdate(req.params.id,updateDate,{new:true})
        if(!company){
            return res.status(400).json({
                message:"Company not found",
                success:false
            })    
        }
        return res.status(200).json({
            message:"Company information updated",
            company,
            success:true
        })    
    } catch (error) {
        console.log(error)
    }
}