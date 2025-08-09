const jwt = require("jsonwebtoken")
const tokenModel = require('../model/token.model.js')

class TokenService{
    generateToken(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {expiresIn : '15m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {expiresIn :'25d'})
        return {accessToken, refreshToken}
    }
    async saveToken(userId, refreshToken){
        const existToken = await tokenModel.findOne({user : userId})
        if(existToken){
            existToken.refreshToken = refreshToken
            return existToken.save()
        }
        const token = await tokenModel.create({user : userId, refreshToken})
        return token
    }
}

module.exports = new TokenService()