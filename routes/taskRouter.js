const Router = require('express')
const router = new Router()
const taskController = require('../controllers/taskController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, taskController.create)
router.put('/:id', authMiddleware, taskController.update)
router.delete('/:id', authMiddleware, taskController.delete)

router.post('/test/:id', taskController.test)

module.exports = router