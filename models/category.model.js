const mongoose = require('mongoose')
const categorySchema = mongoose.Schema({
    name:String,
    article:{type:mongoose.Schema.Types.ObjectId,ref:'article'}
})

module.exports = mongoose.model('category',categorySchema)