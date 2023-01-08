const express = require('express')
const router = express.Router();
const {getAllNote,getNote,postNote,updateNote,deleteNote,deleteAllNote} = require('../controllers/noteController')
router.route("/").get(getAllNote).post(postNote).delete(deleteAllNote)
router.route('/:id').get(getNote).patch(updateNote).delete(deleteNote)

module.exports = router