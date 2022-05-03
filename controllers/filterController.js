const ApiError = require('../error/ApiError')
const { Filter } = require('../models/models')

class FilterController {
    async create(req, res, next) {
        try {
            const {title, query} = req.body
            
            await Filter.create({
                title,
                query,
                userId: req.user.id
            })

            const filters = await Filter.findAll({where: {userId: req.user.id}})

            return res.json({filters})
        } catch (e) {
            next(ApiError.badRequest(`Create-filter-error: ${e.message}`))
        }
    }

    async update(req, res, next) {
        try {
            const {title, query} = req.body
            const filter = await Filter.findOne({where: {id: req.params.id}})

            filter.set({
                title,
                query
            })
            await filter.save()

            const filters = await Filter.findAll({where: {userId: req.user.id}})
            
            return res.json({filters})
        } catch (e) {
            next(ApiError.badRequest(`Update-filter-error: ${e.message}`))
        }
    }

    async delete(req, res, next) {
        try {
            const filter = await Filter.findOne({where: {id: req.params.id}})
            await filter.destroy()

            const filters = await Filter.findAll({where: {userId: req.user.id}})
            
            return res.json({filters})
        } catch (e) {
            next(ApiError.badRequest(`Delete-filter-error: ${e.message}`))
        }
    }
}

module.exports = new FilterController()