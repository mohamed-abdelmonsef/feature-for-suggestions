const mongoose = require('mongoose')
const articleSchema = mongoose.Schema({
    name:String,
    author:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    categories:[{type:mongoose.Schema.Types.ObjectId,ref:'category'}]
})

module.exports = mongoose.model('article',articleSchema)