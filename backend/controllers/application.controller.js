import { Application } from "../models/application.model.js"
import { Job } from "../models/job.model.js"

//for student
export const applyJob = async(req,res)=>{
    try {
        const userId = req.id
        const jobId = req.params.id

        if(!jobId){
            return res.status(400).json({
                message:"Job id is required",
                success:false
            })
        }
        // check if user had already applyed for this job or not
        const alreadyApplied = await Application.findOne({job:jobId,applicant:userId})
        if(alreadyApplied){
            return res.status(400).json({
                message:"You have already applied for this job",
                success:false
            })
        }
        // check if job exist
        const job = await Job.findById(jobId)
        if(!job){
            return res.status(400).json({
                message:"job not found",
                success:false
            })
        }
        // create new application
        const newApplication  = await Application.create({
            job:jobId,
            applicant:userId,
        })
        job.applications.push(newApplication._id)
        await job.save()
        return res.status(200).json({
            message:"Applied successfully",
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

//for student
export const getAppliedJobs = async (req,res)=>{
    try {
        const userId = req.id
        const application = await Application.find({applicant:userId}).sort({createdAt:-1})
        .populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}}
            }
        })
        if(!application){
            return res.status(400).json({
                message:"no application yet",
                success:false
            })
        }
        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

// for recruiter
export const getApplicants = async (req,res)=>{
    const jobId = req.params.id
    const job = await Job.findById(jobId).populate({
        path:'applications',
        options:{sort:{createdAt:-1}},
        populate:{
            path:'applicant',
        }
    })
    if(!job){
        return res.status(400).json({
            message:"Job not found",
            success:false
        })
    }
    return res.status(200).json({
        job,
        success:true
    })
}

// for recruiter
export const updateStatus = async (req,res)=>{
    try {
        const {status} = req.body
        const applicationId = req.params.id
        if(!status){
            return res.status(400).json({
                message:"Status is required",
                success:false
            })
        }
        const application = await Application.findOne({_id:applicationId})
        if(!application){
            return res.status(400).json({
                message:"application not found",
                success:false
            })
        }
        // update status
        application.status = status.toLowerCase()
        application.save()
        return res.status(200).json({
            message:'Status updated successfully',
            success:true
        })    

    } catch (error) {
        
    }
}