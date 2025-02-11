import express from "express";
import { getAllJobs, getJobById, getjobsByrecruiter, postJob,editJob } from "../controllers/job.controller.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

const router = express.Router()

router.route('/post').post(isLoggedIn,postJob)
router.route('/edit/:id').post(isLoggedIn,editJob)
router.route('/get').get(isLoggedIn,getAllJobs)
router.route('/get/:id').get(isLoggedIn,getJobById)
router.route('/getRecruiterJobs').get(isLoggedIn,getjobsByrecruiter) 

export default router

