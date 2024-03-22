import express from 'express'
import { createUser, forgotPassword, loginUser, resetpassword } from '../Controller/register.control.js'
const router=express.Router()

router.post('/register',createUser)

router.post('/login',loginUser)
router.post('/forgotpassword',forgotPassword)
router.post('/resetpassword',resetpassword)
export default router