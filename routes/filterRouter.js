const Router = require('express')
const router = new Router()
const filterController = require('../controllers/filterController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, filterController.create)
router.put('/:id', authMiddleware, filterController.update)
router.delete('/:id', authMiddleware, filterController.delete)

module.exports = router