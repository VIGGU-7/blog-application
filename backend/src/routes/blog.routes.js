import { Router } from "express";
import { checkAuth } from "../middleware/auth.middleware.js";
import { createBlog,getBlogs,getBlogsById,blogsByuserId} from "../controller/blog.controller.js";
const router=Router()
router.post("/create",checkAuth,createBlog)
router.get("/",getBlogs)
router.get("/:id",getBlogsById)
router.get("/user/blogs",checkAuth,blogsByuserId)
export default router;
