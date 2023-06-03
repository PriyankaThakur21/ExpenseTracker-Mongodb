const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config()

exports.decodeToken = async(req, res, next)=>{
    try{
        console.log(process.env.TOKEN_SECRET)
        const token = req.header('Authorization');
        const user = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(user.id);
        const fuser = await User.findByPk(user.id);
        console.log(fuser);
        req.user=fuser;
        next();
        }
        catch(error){
            console.log(error);
            res.json('User Not found!');
        }
}

function generateAccessToken(id){
    return jwt.sign({id: id}, 'eaT5QsOpvS8K0qDtgVmwCoINRnkxLji4');
}

function isStringInValid(string){
    if(string==undefined || string.length===0) return true;
    else return false;
}

async function emailPresent(email){
    try{
        const user = await User.findOne({where: {email: email}});
        if(user===null) return false;
        else return true;
    }
    catch(error){
        console.log(error);
    }
}

exports.signinUsers = async (req, res, next)=>{
    try{
    const {name, email, password} = req.body;
    const emailExists= await emailPresent(email);
    if(emailExists===true){
        return res.status(404).json('Email should be unique');
    }
    if(isStringInValid(name) || isStringInValid(email) || isStringInValid(password)){
        return res.status(404).json('Something is Missing');
    }
        bcrypt.hash(password, 10, async(err, hash)=>{
        const data = await User.create({name, email, password:hash, isPremiumUser:false});
        res.status(201).json('Successfully Registered');
    })
}
    catch(error){
        console.log(error);
    }
    }

exports.loginUsers = async(req, res, next)=>{
        try{
        const {email, password} = req.body;
        if(isStringInValid(email) || isStringInValid(password)){
            return res.status(404).json('Something is Missing');
        }

        const emailExists = await emailPresent(email);
        if(emailExists===false){
            return res.status(404).json('User does not exists');
        }

        const user = await User.findOne({where: {email: email}});
        bcrypt.compare(password, user.password, (err, result)=>{
            if(result===false){
                return res.status(401).json('Password is not correct');
            }
            if(result===true){
                res.status(201).json({message:'Successfully logged in', isPremiumUser: user.isPremiumUser, token: generateAccessToken(user.id)});
            }
        })
        }
        catch(err){
            console.log(err);
        }
    }