const express = require("express")
const postController = require('../controllers/post.controllers.js')
const logger = require('../middlewares/log.js')

const router = express.Router()

router.get('/api/users', postController.getAll)
router.post('/', postController.create)
router.delete('/deleted/:id', postController.delete)
router.put("/edit/:id", postController.edit)
router.get("/get-one/:id", postController.getOne)

module.exports = router