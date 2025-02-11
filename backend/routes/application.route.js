import express from "express";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

const router = express.Router()

router.route('/apply/:id').get(isLoggedIn,applyJob)
router.route('/get').get(isLoggedIn,getAppliedJobs)
router.route('/applicants/:id').get(isLoggedIn,getApplicants)
router.route('/updateStatus/:id').post(isLoggedIn,updateStatus)

export default router