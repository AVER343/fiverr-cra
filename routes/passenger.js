
const Booking= require('../models/booked')
const express= require('express')
const router= express.Router()
const jwt =require('jsonwebtoken')
router.patch('passenger/:id',async(req,res)=>{
    try{ 
        const id = req.params.id
        const extractID = await jwt.verify(id,`SECRET_KEY`)
        if(!extractID)
        {
            throw new Error()
        }
         const bookingInfo= await Booking.updateOne({_id:extractID},{passengers:JSON.parse(req.body.passengers),booked:true})
        console.log(await Booking.findOne({_id:extractID})) 
         if(!bookingInfo)
        {
            throw new Error()
        }
        if(bookingInfo.__v>1)
        {
            throw new Error()
        }
        if(!bookingInfo)
            {
                throw new Error()
            }
      res.send(bookingInfo)
        }
        catch(e){
            console.log(e)
            res.send(400)
        }
})

router.get('passenger/:id',async (req,res)=>{
    try{
      const id = req.params.id
      const extractID = await jwt.verify(id,`SECRET_KEY`)
      if(!extractID)
      {
          throw new Error()
      }
      const bookingInfo = await Booking.findOne({_id:extractID})
      if(!bookingInfo)
          {
              throw new Error()
          }
      res.send({bookingInfo})
      }
  catch(e){
        res.status(400).send({error:'Invalid link !'})
      }
  })
//   router.get('/passenger/image/:id', async (req, res) => {
//     try {
//         const id = req.params.id
//       const extractID = await jwt.verify(id,`SECRET_KEY`)
//       if(!extractID)
//       {
//           throw new Error()
//       }
//       const bookingInfo = await Booking.findOne({_id:extractID})
//       if(!bookingInfo)
//           {
//               throw new Error()
//           }
//         res.set('Content-Type', 'image/png')
//         res.send(bookingInfo.image)
//     } catch (e) {
//         res.status(404).send()
//     }
// })

  module.exports=router