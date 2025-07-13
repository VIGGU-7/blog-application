import { Router } from "express";
import { checkAuth } from "../middleware/auth.middleware.js";
import { postComment } from "../controller/comment.controller.js";
const router=Router()
router.post("/post/:blogId",checkAuth,postComment)
export default router;