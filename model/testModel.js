const mongoose = require('mongoose')

const testSchema = mongoose.Schema({
    name:{
        type:String,
        required: [true,"please provide name"]
    },
    bio:{
        type:String,
        required:[true, "please include bio"],
        default:"A user"
    },
    image: {
        type: String,
        required: true,
        default:""
    }
})

module.exports= mongoose.model('Test', testSchema)