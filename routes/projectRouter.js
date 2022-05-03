const Router = require('express')
const router = new Router()
const projectController = require('../controllers/projectController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, projectController.create)
router.put('/:id', authMiddleware, projectController.update)
router.delete('/:id', authMiddleware, projectController.delete)

module.exports = router