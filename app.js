require('dotenv').config()
require('express-async-errors')
const express = require('express');
const app = express();
const cors = require("cors")
const authRouter = require('./routes/authRoute')
const notFound = require('./middleware/not-Found')
const connectDB = require('./db/config')
const {errorHandler} = require('./middleware/errorHandler')
const authMiddleware = require('./middleware/authMiddleware')
const noteRouter = require('./routes/noteRoute')
const deleteRouter = require('./routes/deleteRoute')

app.use(cors())
app.use(express.json())

app.use('/api',authRouter)
app.use('/api/todo',authMiddleware,noteRouter)
app.use('/api/delete',authMiddleware,deleteRouter)
app.get('/api/v1',(req,res)=>{
    console.log('hello');
    res.send('hello world');
})
app.use(notFound)
app.use(errorHandler)
const port = 4000;
const start = async () =>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(4000, ()=>console.log(`Server is listening on port ${port}`))
    }catch(e){
        console.log(e);
    }
    
}
start();
