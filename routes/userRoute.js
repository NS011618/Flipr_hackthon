const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const User =require('../models/userModel')

router.post('/register',async(req,res)=>{
    try {
        const password=req.body.password
        const salt = await bcrypt.genSalt(10);
        const hashedpassword= await bcrypt.hashSync(password,salt);

        req.body.password=hashedpassword
        const user = new User(req.body);
        const existingUser = await User.findOne({email:req.body.email});
        if(existingUser){
            return res.status(200).send({message:'User already exists', success:false});
        }
        else{
            await user.save()
            return res.status(200).send({message:'User created successfully', success:true});
        }
        


    } catch (error) {
        return res.status(500).send({message:error.message, success:false});        
    }
})

module.exports = router;