const requestTIme = function(req,res,next){
    req.requestTIme = Date.now()
    next()
}
module.exports = requestTIme