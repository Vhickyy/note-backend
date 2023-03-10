const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide name']
    },
    email:{
        type:String,
        required:[true,'Please provide email'],
        unique: true
    },
    password:{
        type: String,
        required:[true,'Please provide password']
    }
})

UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function(){
    return jwt.sign({userId: this._id, name:this.name}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
}

UserSchema.methods.compare = async function(password){
    return await bcrypt.compare(password,this.password)
}

module.exports = mongoose.model('User',UserSchema)

