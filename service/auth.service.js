const userModel = require("../model/user.model.js")
const bcrypt = require('bcrypt')
const UserData = require('../datauser/data.user.js')
const tokenService = require("../service/token.service.js")
const mailService = require("../service/mail.service.js")

class AuthService{
    async register(email, password){
        const existUser = await userModel.findOne({email})

        if(existUser){
            throw new Error(`This email ${email} already has Muhammadjon shunaqa dedi`)
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await userModel.create({email, password : hashPassword})
        const dataUser = new UserData(user)
        await mailService.sendMail(email, `${process.env.LOCALHOST}/auth/activation/${dataUser.id}`)
        const tokens = tokenService.generateToken({...dataUser})
        await tokenService.saveToken(dataUser.id, tokens.refreshToken)
        return {user: dataUser, ...tokens}
    }
    async activation(userId){
        const user = await userModel.findById(userId)
        if(!user){
            throw new Error("User is not defined")
        }
        user.isActivated = true
        await user.save()
    }
}

module.exports = new AuthService()