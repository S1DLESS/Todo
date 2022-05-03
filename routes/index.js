const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const taskRouter = require('./taskRouter')
const projectRouter = require('./projectRouter')
const filterRouter = require('./filterRouter')
const labelRouter = require('./labelRouter')

router.use('/user', userRouter)
router.use('/tasks', taskRouter)
router.use('/projects', projectRouter)
router.use('/filters', filterRouter)
router.use('/labels', labelRouter)

module.exports = router