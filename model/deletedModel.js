const mongoose = require('mongoose');
const deleteSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Title cannot be empty']
    },
    note:{
        type:String,
        required:true
    },
    category:{
        type: String,
    },
    createdBy:{
        type: mongoose.Schema.ObjectId,
        required:true,
        ref:'User'
    }

},{
    timestamps:true
})

module.exports = mongoose.model('recentdelete', deleteSchema)