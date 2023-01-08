const Test = require('../model/testModel')
const createTestUser = async(req,res)=>{
    const {name} = req.body
    if(!name){
        throw new Error("Please provide name")
    }
    const user = await Test.create(req.body)
}
const getTestUser = async(req,res)=>{
    const {name} = req.body
    if(!name){
        throw new Error("Please provide name")
    }
    const user = await Test.create(req.body)
}

const upload= async(req,res)=>{
    
}