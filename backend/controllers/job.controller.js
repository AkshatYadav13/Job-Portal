import {Job} from '../models/job.model.js'

// recruiter
export const postJob = async (req,res)=>{
    try {
        const {title,description,requirements,salary,location,jobType,experience,position,companyId} = req.body
        const userId = req.id
        if(!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId){
            return res.status(400).json({
                message:"Somthing is missing",
                success: false
            })
        }
        const job = await Job.create({
            title,
            description,
            requirements:requirements.split('_'),
            salary:Number(salary),
            location,
            jobType,
            experience,
            position,
            company: companyId,
            created_by:userId
        });
        return res.status(200).json({
            message:"New Job created successfully",
            job,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

// student
export const getAllJobs = async (req,res)=>{
    try {
        const keyword = req.query.keyword || ''
        const query = {
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:'i'}},
                {location:{$regex:keyword,$options:'i'}},
            ]
        }
        const jobs = await Job.find(query).populate("company").sort({createdAt:-1});
        if(!jobs){
            return res.status(400).json({
                message:"Jobs not found.",
                success:false
            })    
        }
        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

// student
export const getJobById = async (req,res)=>{
    try {
        const jobId = req.params.id
        const job = await Job.findById(jobId).populate('applications').populate('company')
        if(!job){
            return res.status(400).json({
                message:"Job not found.",
                success:false
            })    
        }
        return res.status(200).json({
            job,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

// recruiter
export const getjobsByrecruiter = async(req,res)=>{
    try {
        const recruiterId = req.id
        const jobs = await Job.find({created_by:recruiterId}).populate('company')
        if(jobs.length<=0){
            return res.status(400).json({
                message:"Jobs not found.",
                success:false
            })    
        }
        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

export const editJob = async(req,res)=>{
    try {
        const {title,description,requirements,salary,location,jobType,experience,position,companyId} = req.body
        const jobId = req.params.id
        if(!title || !description || !requirements || !salary || !location || !experience || !position || !companyId){
            return res.status(400).json({
                message:'something is missing',
                success:false
            })
        }
        const updateDate = {
            title,
            description,
            requirements:requirements.split('_'),
            salary,
            location,
            jobType,
            experience,
            position,
            company:companyId
        }
        const job = await Job.findByIdAndUpdate(jobId,updateDate,{new:true})
        if(!job){
            return res.status(400).json({
                message:'Job not found',
                success:false
            })
        }
        return res.status(200).json({
            message:'Job updated successfully',
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}