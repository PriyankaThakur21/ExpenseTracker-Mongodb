const Sib = require('sib-api-v3-sdk');
require('dotenv').config();

exports.forgotpassword = async(req, res, next)=>{
    try{
    const{email}= req.body;
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
                      <a href="http://localhost:3000/password/resetpassword">Reset password</a>`
    })
    console.log(mail);
    res.status(202).json('Mail is sent');
    }
    catch(err){
        console.log(err);
    }
}