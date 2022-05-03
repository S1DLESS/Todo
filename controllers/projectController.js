const sequelize = require('../db')
const ApiError = require('../error/ApiError')
const { Project } = require('../models/models')

class ProjectController {

    async create(req, res, next) {
        try {
            const {title} = req.body
            const [results, metadata] = await sequelize.query(`
                select "order" from projects where "userId" = ${req.user.id}
                order by "order" desc
            `)
            const bigOrder = results[0].order
            const newProject = await Project.create({
                title,
                order: bigOrder + 1,
                userId: req.user.id
            })

            const projects = await Project.findAll({where: {userId: req.user.id}})

            return res.json({projects})
        } catch (e) {
            next(ApiError.badRequest(`Create-project-error: ${e.message}`))
        }
    }

    async update(req, res, next) {
        try {
            const {title} = req.body
            const project = await Project.findOne({where: {id: req.params.id}})

            project.set({
                title
            })
            await project.save()

            const projects = await Project.findAll({where: {userId: req.user.id}})
            
            return res.json({projects})
        } catch (e) {
            next(ApiError.badRequest(`Update-project-error: ${e.message}`))
        }
    }

    async delete(req, res, next) {
        try {
            const project = await Project.findOne({where: {id: req.params.id}})
            
            await sequelize.query(`update "projects" 
            set "order" = "order" - 1 
            where "order" > ${project.order} 
            and "userId" = ${req.user.id}`)

            await project.destroy()

            const projects = await Project.findAll({where: {userId: req.user.id}})
            
            return res.json({projects})
        } catch (e) {
            next(ApiError.badRequest(`Delete-project-error: ${e.message}`))
        }
    }
}

module.exports = new ProjectController()