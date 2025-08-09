const postModel = require('../model/post.model.js')
const fileService = require('../service/file.service.js')

class PostService{
    async getAll(){
        const allPost = await postModel.find()
        return allPost
    }
    async create(post, picture){
        const fileName = fileService.save(picture)
        const newPost = await postModel.create({...post, picture : fileName})
        return newPost
    }
    async delete(id){
        const post = await postModel.findByIdAndDelete(id)
        return post
    }
    async edit(post, id){
        if(!id){
            throw new Error("Id not foun")
        }
        const updateData = await postModel.findByIdAndUpdate(id, post, {
            new : true
        })
        return updateData
    }
    async getOne(id){
        const post = await postModel.findById(id)
        return post
    }
}

module.exports = new PostService()