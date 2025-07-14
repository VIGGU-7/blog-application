import { Router } from "express";
import { checkAuth } from "../middleware/auth.middleware.js";
import { editComment, postComment,deleteComment } from "../controller/comment.controller.js";
const router=Router()
router.post("/post/:blogId",checkAuth,postComment)
router.put("/edit/:commentId",checkAuth,editComment)
router.delete("/delete/:commentId",checkAuth,deleteComment)
export default router;