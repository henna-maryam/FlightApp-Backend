const express = require('express');
const bodyParser = require('body-parser');
const userScheme = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json()); 

router.post('/signup', async(req,res) => {
    const {firstName, lastName, phone, email, password} = req.body;
    try {
        const existingUser = await userScheme.findOne({email});
        if(existingUser){
            return res.status(400).json({message:'User already exists'});
        }
        const hashedpassword = await bcrypt.hash(password, 8);
        const newUser = new userScheme({firstName, lastName, phone, email, password:hashedpassword});
        await newUser.save();
        res.status(201).json({message: 'User created successfully'});
    } catch (error) {
        res.status(500).json({error: 'Error while creating user!!!'});
    }
});



router.post('/login', async(req,res) => {
    const {email, password} = req.body;
    try{
        if(!email || !password){
            return res.status(400).json({message: 'Email and password are required'});
        }

        const user = await userScheme.findOne({email});
        if(!user){
            return res.status(400).json({message: 'Invalid Username'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: 'Invalid Input'});
        }
        const token = jwt.sign({userId: user._id}, "secret_key", {expiresIn: "1h"});
        res.status(200).json({message: 'Login Successfull', token});
    }catch(error){
        res.status(500).json({error: 'internal server error'});
    }
})

module.exports = router;