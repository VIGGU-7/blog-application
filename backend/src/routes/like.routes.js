import { Router } from "express";
import { likeOrDislike } from "../controller/like.controller.js";
import { checkAuth } from "../middleware/auth.middleware.js";
const router=Router()
router.get("/:blogId",checkAuth,likeOrDislike)
export default router;
