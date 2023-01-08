const User = require('../model/userModel')


// register user
// post request
// const registerUser = (req,res)=>{
//     if(!req.text){
//         res.status(400)
//         throw new Error('provide all field')
//     }
// }
const registerUser = async (req,res)=>{
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please provide all field')
    }
    const exists = await User.findOne({email})
    if(exists){
        res.status(400)
        throw new Error('Email already in use.')
    }
    const user = await User.create(req.body)
    const token = user.createJWT()
    res.status(201).json({user:user._id, token})

};

//login user
//post request
const loginUser = async (req,res)=>{
    const { email, password} = req.body;
    if(!email || !password){
        res.status(400)
        throw new Error('Please provide all fields')
    }
    const user = await User.findOne({email});
    if(!user){
        res.status(401)
        throw new Error('Invalid Credentials')
    }
    const correctPassword = await user.compare(password)
    if(!correctPassword){
        res.status(401)
        throw new Error('Invalid Credentials')
    }
    const token = user.createJWT()
    res.status(201).json({user:user._id, token})
};

//get user
//get request
const getUser = (req,res)=>{
    console.log('hello');
    res.send('hello world');
};
module.exports = {registerUser,loginUser,getUser}