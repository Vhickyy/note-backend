const express = require('express')
const router = express.Router();
const {retrieve,deleteAll,getAllDeleted,deleteOne} = require('../controllers/deleteController')
router.delete('/retrieve/:id',retrieve).delete("/:id",deleteOne);
router.delete('/',deleteAll).get('/',getAllDeleted)

module.exports = router