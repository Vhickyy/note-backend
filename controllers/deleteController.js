const Notes = require('../model/noteModel')
const Recentdelete = require('../model/deletedModel')
const getAllDeleted = async(req,res)=>{
    const {userId} = req.user
    const note = await Recentdelete.find({createdBy: userId}).sort('createdAt')
    res.status(200).json({note,count: note.length})
}
const retrieve = async(req,res)=>{
    const {userId} = req.user
    const {id} = req.params
    const note = await Recentdelete.findByIdAndRemove({_id:id,createdBy:userId})
    if(!note){
        throw new Error(`No job with id ${id}`)
    }
    const newNote ={title:note.title,note:note.note,createdBy:note.createdBy,completed:note.completed,createdAt:note.createdAt,updatedAt:note.updatedAt,_id:note._id}
    await Notes.create(newNote)
    const send = await Recentdelete.find({createdBy:userId})
    res.status(200).json({send})
}
const deleteOne = async(req,res)=>{
    const {userId} = req.user
    const {id} = req.params
    const note = await Recentdelete.findByIdAndRemove({_id:id,createdBy:userId})
    if(!note){
        throw new Error(`No job with id ${id}`)
    }
    const newNote ={title:note.title,note:note.note,createdBy:note.createdBy,completed:note.completed,createdAt:note.createdAt,updatedAt:note.updatedAt,_id:note._id}
    const send = await Recentdelete.find({createdBy:userId})
    res.status(200).json({send})
}
const deleteAll = async(req,res)=>{
    const {userId} = req.user
    const del = await Recentdelete.deleteMany({createdBy: userId})
    if(!del){
        throw new Error(`No job with id ${userId}`)
    }
    res.status(200).json({msg:'succesful'})
}

module.exports={retrieve,deleteAll,getAllDeleted,deleteOne}