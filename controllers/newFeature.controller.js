const articleModel = require('../models/article.model')
const categoryModel = require('../models/category.model')
const userModel = require('../models/user.model')


exports.displaySuggestions = async(req,res)=>{
    let articlesId = []
    let lastResult = []
    let openedArticleId = req.params.articleId
    let openedArticle = await articleModel.findOne({_id:openedArticleId})
    let author = await userModel.findOne({_id:openedArticle.author})
    let user = await userModel.findOne({_id:req.userId})

    for (let i = 0; i < openedArticle.categories.length; i++) {
        let category = await categoryModel.findOne({_id:openedArticle.categories[i]})
        let sameCategories = await categoryModel.find({name:category.name})
        for (let i = 0; i < sameCategories.length; i++) {
            articlesId.push(sameCategories[i].article)      
        }
    }

    articlesId = articlesId.filter(function(item) {
        return item+'' !== openedArticleId
    })

    if (openedArticle.author==req.userId) {
        let result = articlesId.filter(x => !author.articles.includes(x));
        for (let i = 0; i < result.length; i++) {
            let article = await articleModel.findOne({_id:result[i]})
            lastResult.push(article)
        }
        return res.send(lastResult)      
    }

    let cleanCategories = articlesId.filter(x => !user.articles.includes(x));
    let sameAuthor = cleanCategories.filter(x => author.articles.includes(x));
    let similarCats = cleanCategories.filter(x => !author.articles.includes(x));

    author.articles = author.articles.filter(function(item) {
        return item+'' !== openedArticleId
    })
    let resultIds = sameAuthor.concat(similarCats).concat(author.articles)

    for (let i = 0; i < resultIds.length; i++) {
        let article = await articleModel.findOne({_id:resultIds[i]})
        lastResult.push(article)
    }
    res.send(lastResult)
}
