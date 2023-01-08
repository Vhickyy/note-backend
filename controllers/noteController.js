const Notes = require('../model/noteModel')
const Recentdelete = require('../model/deletedModel')
const getAllNote= async (req,res)=>{
    const notes = await Notes.find({createdBy: req.user.userId}).sort('createdAt')
    const {search,category} = {}
    let filtered = {createdBy: req.user.userId}
    if(search){
        filtered.title = {$regex: search, $option:'i'}
    }
    if(category && category !== "all"){
        filtered.category = category
    }
    const result = await Note.find({filtered})
    res.status(200).json({notes,result,count: notes.length})
}
const postNote= async (req,res)=>{
    const {title, note} = req.body
    if(!note|| !title){
        throw new Error('Bad Request')
    }
    req.body.createdBy = req.user.userId
    const notes = await Notes.create(req.body)
    res.status(201).json(notes)
}
const getNote = async ()=>{
    const {userId} = req.user
    const {id: noteId} = req.params
    const note = await Notes.findOneById({_id: noteId, createdBy: userId})
    if(!note){
        throw new Error(`No job with id ${noteId}`)
    }
    res.status(200).json({note})
}
const updateNote = async(req,res)=>{
    const {userId} = req.user
    const {id: noteId} = req.params
    const {title, note} = req.body
    if(!note|| !title){
        throw new Error('Bad Request')
    }
    const notes = await Notes.findOneAndUpdate({_id: noteId, createdBy: userId},req.body,{new:true,runValidators:true})
    if(!notes){
        throw new Error(`No job with id ${noteId}`)
    }
    res.status(200).json({notes})
}
const deleteNote= async (req,res)=>{
    const {userId} = req.user
    const {id: noteId} = req.params
    // const deleted = await Notes.find({_id:todoId,createdBy:userId})
    const note = await Notes.findOneAndRemove({_id: noteId, createdBy: userId})
    if(!note){
        throw new Error(`No job with id ${noteId} and ${userId}`)
    }
    const newNote ={title:note.title,note:note.note,category:note.category,createdBy:note.createdBy,completed:note.completed,createdAt:note.createdAt,updatedAt:note.updatedAt,_id:note._id}
    const del = await Recentdelete.create(newNote)
    // await Recentdelete.insertOne(deleted)
    if(!del){
        res.status(400)
        throw new Error('Not created')
    }
    res.status(200).json({msg: 'successful'})
}
const deleteAllNote = async (req,res) =>{
     const {userId} = req.user
     const deleted = await Notes.find({createdBy:userId})
    const note = await Notes.deleteMany({createdBy: userId})
    if(!note){
        throw new Error(`No job`)
    }
    await Recentdelete.insertMany(deleted)
    res.status(200).json({msg:'successful'})
}

module.exports = {getAllNote,getNote,postNote,updateNote,deleteNote,deleteAllNote}
