const Admin =require('../models/admin')
const Booking= require('../models/booked')
const express= require('express')
const router= express.Router()
const multer = require('multer')
const upload = multer();
const jwt =require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const sharp = require('sharp')
const auth = require('../middleware/auth')
// router.post('/admin',async (req,res)=>{
//    try{
//     const {username,password,email}=req.body
//     const admin = new Admin({username,password,email})
// await admin.save()
//     const token = await admin.generateAuthToken()
//     console.log(admin)
//     res.status(200).send({admin,token})
//    }
//    catch(e){
//         console.log(e)
//         res.status(400).send({error:"Something went Wrong!"})
//    }
// })
router.post('/admin/login',async (req,res)=>{
   try{
        const {email,password} =req.body.data
        const user  =await  Admin.findByCredentials(email,password)
        const token = await user.generateAuthToken()
        res.send({user,token})
    }
    catch(e){
        res.status(400).send({error:"Authentication failed !"})
    }
})
router.post('/admin/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send({message:"Admin  logged out successfully !"})
    } catch (e) {
        res.status(500).send({message:"Error Logging Out  !"})
    }
})
router.post('/admin/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})
router.get('/admin',auth,async(req,res)=>{
    try{
        res.sendStatus(200)
    }   
    catch(e){

    }
})
router.post('/admin/passenger',auth,upload.any(),async(req,res)=>{
    try{    
       const passengers=JSON.parse(req.body.passengers)
       const price = req.body.price
       const image= await sharp(req.files[0].buffer).resize({ width: 2000, height: 2000 }).png().toBuffer()
       const bookingInfo = new Booking({image,passengers,price})
       await bookingInfo.save()
       const id = await jwt.sign({_id:bookingInfo._id.toString()},`SECRET_KEY`)  //unique id for each link to refer each booking    
       res.send({id})
    }
    catch(e){
        console.log(e)
        res.send(400)
    }
})

module.exports=router