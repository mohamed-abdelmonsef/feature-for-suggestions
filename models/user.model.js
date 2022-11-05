const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    emailConfirm:{type:Boolean ,default:false},
    articles:[{type:mongoose.Schema.Types.ObjectId,ref:'article'}]
},{timestamps : true})

module.exports = mongoose.model('user' ,userSchema)