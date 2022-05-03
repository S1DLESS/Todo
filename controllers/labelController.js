const ApiError = require('../error/ApiError')
const { Label } = require('../models/models')

class LabelController {
    async create(req, res, next) {
        try {
            const {title} = req.body
            
            await Label.create({
                title,
                userId: req.user.id
            })

            const labels = await Label.findAll({where: {userId: req.user.id}})

            return res.json({labels})
        } catch (e) {
            next(ApiError.badRequest(`Create-label-error: ${e.message}`))
        }
    }

    async update(req, res, next) {
        try {
            const {title} = req.body
            const label = await Label.findOne({where: {id: req.params.id}})

            label.set({
                title
            })
            await label.save()

            const labels = await Label.findAll({where: {userId: req.user.id}})
            
            return res.json({labels})
        } catch (e) {
            next(ApiError.badRequest(`Update-label-error: ${e.message}`))
        }
    }

    async delete(req, res, next) {
        try {
            const label = await Label.findOne({where: {id: req.params.id}})
            await label.destroy()

            const labels = await Label.findAll({where: {userId: req.user.id}})
            
            return res.json({labels})
        } catch (e) {
            next(ApiError.badRequest(`Delete-label-error: ${e.message}`))
        }
    }
}

module.exports = new LabelController()