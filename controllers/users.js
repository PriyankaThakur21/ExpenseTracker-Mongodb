const User = require('../models/users');

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

async function passwordPresent(password){
    try{
        const paswrd = await User.findOne({where: {password: password}});
        if(paswrd===null) return false;
        else return true;
    }
    catch(error){
        console.log(error);
    }
}

exports.signinUsers = async (req, res, next)=>{
    const {name, email, password} = req.body;
    const emailExists= await emailPresent(email);
    if(emailExists===true){
        return res.json('Email should be unique');
    }
    if(isStringInValid(name) || isStringInValid(email) || isStringInValid(password)){
        return res.status(404).json('Something is Missing');
    }
    try{
        const data = await User.create({
        name: name,
        email: email,
        password: password
    });
    res.status(201).json('Successfully Registered');
    }
    catch(error){
        console.log(error);
    }
    }

    exports.loginUsers = async(req, res, next)=>{
        try{
        const {email, password} = req.body;
        if(isStringInValid(email) || isStringInValid(password)){
            return res.json('Something is Missing');
        }
        const emailExists = await emailPresent(email);
        if(emailExists===false){
            return res.json('User does not exists');
        }
        const passwordExists = await passwordPresent(password);
        if(passwordExists===false){
            return res.json('Password is not correct');
        }
        if(emailExists===true && passwordExists===true){
        res.json('Successfully logged in');
        }
        }
        catch(err){
            console.log(err);
        }
    }