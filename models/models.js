const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING},
    avatar: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
})

const UserConfig = sequelize.define('user_config', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    showCompletedTasks: {type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false},
})

const Project = sequelize.define('project', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    order: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
    isInbox: {type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false}
})

const Filter = sequelize.define('filter', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    query: {type: DataTypes.STRING, allowNull: false}
})

const Priority = sequelize.define('priority', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false}
}, {timestamps: false})

const Label = sequelize.define('label', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false}
})

const Task = sequelize.define('task', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    done: {type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING},
    date: {type: DataTypes.DATE},
    hasTime: {type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false},
    timeOrder: {type: DataTypes.INTEGER},
    projectOrder: {type: DataTypes.INTEGER},
    completionDate: {type: DataTypes.DATE}
})

const TaskLabel = sequelize.define('task_label', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasOne(UserConfig)
UserConfig.belongsTo(User)

User.hasMany(Project)
Project.belongsTo(User)

User.hasMany(Filter)
Filter.belongsTo(User)

User.hasMany(Label)
Label.belongsTo(User)

Project.hasMany(Task)
Task.belongsTo(Project)

Priority.hasMany(Task)
Task.belongsTo(Priority)

Task.belongsToMany(Label, {through: TaskLabel})
Label.belongsToMany(Task, {through: TaskLabel})

module.exports = {
    User,
    UserConfig,
    Project,
    Filter,
    Priority,
    Label,
    Task,
    TaskLabel
}