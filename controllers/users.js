const { error } = require('console');
const User = require('../models/users');

exports.PostUsers = async (req, res, next)=>{
    console.log(req.body);
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    try{
    const data = await User.create({
        name: name,
        email: email,
        password: password
    });
    res.status(201).json(data);
}
    catch(error){
        console.log(error);
    }
    }