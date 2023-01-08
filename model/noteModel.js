const mongoose = require('mongoose');
const NoteSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Title cannot be empty']
    },
    note:{
        type:String
    },
    category:{
        type: String,
        enum: ["personal","work","school"],
        default: "personal"
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        required:true,
        ref:'User'
    } 
},{
    timestamps:true
})

module.exports = mongoose.model('note', NoteSchema)