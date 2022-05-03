const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')
const { User, UserConfig, Project, Filter, Label, Task, TaskLabel, Priority } = require('../models/models')

const generateJwt = (id, email) => {
    return jwt.sign(
        {id, email},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest("Некорректный email или пароль"))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest("Пользователь с таким email уже существует"))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, password: hashPassword})
        await UserConfig.create({userId: user.id})
        await Project.create({title: 'Входящие', userId: user.id, isInbox: true})
        await Filter.create({title: 'Приоритет 1', query: 'priority 1', userId: user.id})
        await Filter.create({title: 'Приоритет 2', query: 'priority 2', userId: user.id})
        await Filter.create({title: 'Приоритет 3', query: 'priority 3', userId: user.id})
        await Filter.create({title: 'Приоритет 4', query: 'priority 4', userId: user.id})
        await Filter.create({title: 'Посмотреть все', query: 'view all', userId: user.id})
        await Filter.create({title: 'Нет срока выполнения', query: 'no date', userId: user.id})
        const token = generateJwt(user.id, user.email)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email)
        return res.json({token})
    }

    async reset(req, res, next) {
        const {email} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        const token = generateJwt(user.id, user.email)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email)
        return res.json({token})
    }

    async editAccount(req, res, next) {
        try {
            const {username, email, password} = req.body
            const avatar = req.files
            console.log({username, email, password, avatar})
            
            const user = await User.findOne({where: {id: req.user.id}})
            if (!user) {
                return next(ApiError.badRequest('Не найден пользователь'))
            }

            let avatarFileName = ''
            if (avatar) {
                if (user.avatar) {
                    try {
                        fs.unlinkSync(path.resolve(__dirname, '..', 'static', 'avatars', user.avatar))
                    } catch (e) {
                        console.log('DeleteOldAvatarError: ', e)
                    }
                }
                avatarFileName = uuid.v4() + ".jpg"
                avatar.avatar.mv(path.resolve(__dirname, '..', 'static', 'avatars', avatarFileName))
            }

            let hashPassword = ''
            if (password) {
                hashPassword = await bcrypt.hash(password, 5)
            }

            user.set({
                username: username ? username : user.username,
                avatar: avatar ? avatarFileName : user.avatar,
                email: email ? email : user.email,
                password: password ? hashPassword : user.password
            })
            await user.save()

            const newUser = await User.findOne({attributes: ['id', 'username', 'avatar', 'email'], where: {id: req.user.id}})

            res.json({user: newUser})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async editAccountSettings(req, res, next) {
        try {
            const {showCompletedTasks} = req.body
            const userConfig = await UserConfig.findOne({where: {userId: req.user.id}})
            if (!userConfig) {
                return next(ApiError.badRequest('Не найдены пользовательские настройки'))
            }
            userConfig.set({
                showCompletedTasks
            })
            await userConfig.save()

            const newUserConfig = await UserConfig.findOne({where: {userId: req.user.id}})
            return res.json({userConfig: newUserConfig})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async data(req, res, next) {

        const user = await User.findOne({attributes: ['id', 'username', 'avatar', 'email'], where: {id: req.user.id}})
        if (!user) {
            return next(ApiError.badRequest('Не найден пользователь'))
        }
        const userConfig = await UserConfig.findOne({attributes: ['showCompletedTasks'], where: {userId: req.user.id}})
        const projects = await Project.findAll({attributes: ['id', 'title', 'order', 'isInbox'], where: {userId: req.user.id}})
        const filters = await Filter.findAll({attributes: ['id', 'title', 'query'], where: {userId: req.user.id}})
        const labels = await Label.findAll({attributes: ['id', 'title'], where: {userId: req.user.id}})
        const tasks = await Task.findAll({attributes: ['id', 'done', 'title', 'description', 'date', 'hasTime', 'timeOrder', 'projectOrder', 'projectId', 'priorityId', 'completionDate'], where: {projectId: projects.map(el => el.id)}})
        const taskLabels = await TaskLabel.findAll({attributes: ['id', 'taskId', 'labelId'], where: {labelId: labels.map(el => el.id)}})
        const priorities = await Priority.findAll()

        return res.json({
            user,
            userConfig,
            projects,
            filters,
            labels,
            tasks,
            taskLabels,
            priorities
        })
    }
}

module.exports = new UserController()