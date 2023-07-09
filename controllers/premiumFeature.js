const User = require('../models/users');
const Expense = require('../models/expense');
const AWS = require('aws-sdk');
require('dotenv').config()

exports.getLeaderboard = async(req, res, next)=>{
    try{
    const leaderBoardUsers = await User.find().sort({ 'totalExpense': -1 }).exec();
    res.status(202).json(leaderBoardUsers);
    }   
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

exports.downloadfile = async (req, res, next)=>{
    try{
    const expenses = await Expense.find({userId: req.user.id});
    const stringifyexpenses = JSON.stringify(expenses);
    const userid = req.user.id;
    const filename = `Expense${userid}/${new Date()}.txt`;
    const fileUrl = await uploadToS3(stringifyexpenses, filename);
    res.status(200).json(fileUrl);
    } 
    catch(err){
        console.log(err);
        res.status(400).json('something went wrong', err);
    }
}

async function uploadToS3(data, filename){
    const bucketName = process.env.BUCKET_NAME;
    const IAMuserkey = process.env.IAM_USER_KEY;
    const IAMusersecret = process.env.IAM_USER_SECRET;

    let s3bucket = new AWS.S3({
        accessKeyId : IAMuserkey,
        secretAccessKey: IAMusersecret
    })
        var params= {
            Bucket: bucketName,
            Key: filename,
            Body: data,
            ACL: 'public-read'
        }
        return new Promise((resolve, reject)=>{
            s3bucket.upload(params, (err,s3response)=>{
            if(err){
                console.log('something went wrong', err);
            }
            else{
                console.log('success', s3response);
                resolve(s3response.Location);
                
            }
        })})
    }