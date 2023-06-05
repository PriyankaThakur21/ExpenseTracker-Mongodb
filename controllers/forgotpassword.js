const Sib = require('sib-api-v3-sdk');
require('dotenv').config();
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const User = require('../models/users');
const ForgotPassword = require('../models/forgotpassword')

exports.forgotpassword = async(req, res, next)=>{
    try{
    const{email}= req.body;
    const user = await User.findOne({where : { email }});
    console.log(user);
    if(user===null) return res.json('Email does not exist');

    const id = uuid.v4();
    await ForgotPassword.create({id, isActive: true, userId: user.id});

    const client = Sib.ApiClient.instance;
    const apiKey = client.authentications['api-key'];
    apiKey.apiKey = process.env.API_KEY;

    const transEmailApi = new Sib.TransactionalEmailsApi();
    const sender = {
        email: "thakur.pri112@gmail.com"
    }
    const receivers = [{
        email: `${email}`
    }]
    const mail = await transEmailApi.sendTransacEmail({
        sender, 
        to: receivers,
        subject: 'Forgot your Password?',
        htmlContent: `<h4>Reset your password</h4><br>
                      <a href="http://localhost:3000/resetpassword/${id}">Reset password</a>`
    })
    console.log(mail);
    res.status(202).json('Mail is sent');
    }
    catch(err){
        console.log(err);
    }
}

exports.resetpassword = async (req, res, next)=>{
    try{
    const id = req.params.id;
    const forgotpasswordrequest = await ForgotPassword.findOne({where : {id: id}});
    await forgotpasswordrequest.update({isActive: false});
                      res.send(`<form action="/updatepassword/${id}" method="get"><br><br>
                      <label for="newpassword">Enter New password</label><br><br>
                      <input name="newpassword" type="password" required></input><br><br>
                      <button>reset password</button>
                      </form>`);
                 }
    catch(err){
        console.log(err);
    }
}

exports.updatepassword = async (req, res, next)=>{
    try {
        const { newpassword } = req.query;
        console.log(req.query)
        console.log(req.body)
        const { resetpasswordid } = req.params;
        const resetpasswordrequest = await ForgotPassword.findOne({ where : { id: resetpasswordid }})
        const user = await User.findOne({where: { id : resetpasswordrequest.userId}})
                if(user) {
                    const saltRounds = 10;
                    bcrypt.genSalt(saltRounds, function(err, salt) {
                        if(err){
                            console.log(err);
                            throw new Error(err);
                        }
                        bcrypt.hash(newpassword, salt, function(err, hash) {
                            if(err){
                                console.log(err);
                                throw new Error(err);
                            }
                            user.update({password: hash});
                            res.status(201).json('Successfuly update the new password')
                            })
                        });
                    }
            else{
                return res.status(404).json('No user Exists');
            }
    } catch(error){
        return res.status(403).json({ error, success: false } )
    }
}