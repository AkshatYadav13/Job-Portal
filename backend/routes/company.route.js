import express from "express";
import { getCompanies, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router()

router.route('/register').post(isLoggedIn,registerCompany)
router.route('/get').get(isLoggedIn,getCompanies)
router.route('/get/:id').get(isLoggedIn,getCompanyById)
router.route('/update/:id').post(isLoggedIn,singleUpload,updateCompany)

export default router