const Order = require('../models/orders');
const Razorpay = require('razorpay');

exports.purchasePremium = async (req, res, next)=>{
    var rzp =new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    })
    const amount ="100000";
    rzp.orders.create({amount , currency: 'INR'}, (err, order)=>{
        if(err){
            console.log(err);
        }
        Order.create({
            orderId: order.id, 
            status: 'PENDING',
            userId: req.user.id
        }).then(()=>{
            return res.status(201).json({order, key_id: rzp.key_id});
        })
        .catch(err=>{throw new Error(err)});
        })
}

exports.transactionSuccess = async(req, res, next)=>{
    try{
    const {payment_id, order_id} = req.body;
    const order = await Order.findOne({orderId: order_id});
    const promise1 = await order.updateOne({paymentId:payment_id, status: 'SUCCESSFUL'});
    const promise2 = await req.user.updateOne({isPremiumUser:true});
    
    Promise.all([promise1, promise2]).then(()=>{
    res.status(202).json({success:true, message:'Transaction Successful'});
    })
    .catch((err)=>{
        console.log(err);
    })
}
catch(err){
        console.log(err);
        res.status(403).json({error:err, message:'Something went wrong'});
}
}