const articleModel = require('../models/article.model')
const categoryModel = require('../models/category.model')
const userModel = require('../models/user.model')

exports.fakeArticles = async(req ,res ,next)=>{
    try {
        const {name,categories} = req.body
        const article = new articleModel({name:name,author:req.userId})
        article.save().then(async(result)=>{

            for (let i = 0; i < categories.length; i++) {
            const category = new categoryModel({name:categories[i] ,article:article._id})

            category.save().then(async(result)=>{
                await articleModel.updateMany({_id:article._id},{$push:{categories:category._id}})
                await userModel.updateMany({_id:req.userId},{$push:{articles:article._id}})
                res.status(201).json({message:"added successfully"})
            })   
            }
        })

    } catch (error) {
         console.log(error);
    }    
}