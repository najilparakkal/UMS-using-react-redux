const mongoose=require('mongoose')

require('dotenv').config()
mongoose.connect(process.env.MONGODB)

const db=mongoose.connection;

db.on('error',console.error.bind(console,'Mongodb connection error'))
db.once('open',()=>{
    console.log('connected to mogodb');
})

