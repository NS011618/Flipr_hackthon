const mongoose=require('mongoose');

mongoose.connect(process.env.MONGO_URL)

const connection = mongoose.connection;

//checking whether monogobd is connected or not
connection.on('connected',()=>{
    console.log("mongodb is connected");
})

//checking any error is their or not
connection.on('error',(err)=>{
    console.log(err);
})

module.exports = connection;