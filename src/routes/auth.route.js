import {Router} from "express";
const router = Router()

import login from "../controller/auth/login.js"
import signup from "../controller/auth/signup.js"
import logout from "../controller/auth/logout.js"

router.post("/login",login)
router.post("/signup",signup)
router.post("/logout",logout)

export default router;