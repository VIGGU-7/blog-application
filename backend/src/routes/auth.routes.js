import { Router } from "express";
import { checkAuth } from "../middleware/auth.middleware.js";
import { login,signup,forgotPassword,sendResetPassEmail,verifyUser,resendVerifyEmail, checksession, logout, editProfile } from "../controller/auth.controller.js";
const router=Router()
router.post("/login",login)
router.post("/signup",signup)
router.post("/sendforgotcode",sendResetPassEmail)
router.post("/forgotpass/:code",forgotPassword)
router.post("/verify/:code",checkAuth,verifyUser)
router.post("/resendverify",checkAuth,resendVerifyEmail)
router.get("/checksession",checkAuth,checksession)
router.post("/updateprofile",checkAuth,editProfile)
router.get("/logout",logout)
export default router;
