const Router = require('express')
const router = new Router()
const labelController = require('../controllers/labelController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, labelController.create)
router.put('/:id', authMiddleware, labelController.update)
router.delete('/:id', authMiddleware, labelController.delete)

module.exports = router