const express= require ('express')
const path=require('path')
const cookieParser=require('cookie-parser')
const logger=require('morgan')
const http=require('http')
const session=require('express-session')
const connect=require('./models/mongoose')
const cors = require('cors')
const userRouter =require('./routes/users')
const adminRouter=require('./routes/admin')

const app=express()

app.use('/Profile', express.static(path.join(__dirname, 'public/Profile',)));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser());
app.use(cors())
// app.use(session({
//     secret: process.env.JWT_SECRET,
//     saveUninitialized: true,  
//     resave: false
// }))

// app.use(cors({
//     origin:"http:localhost:3000",
//     allowedHeaders:["session"]
// }))

app.use('/', userRouter);
app.use('/admin', adminRouter);

var port =process.env.PORT||'3001'
app.set(port)
var server=http.createServer(app)
server.listen(port)

