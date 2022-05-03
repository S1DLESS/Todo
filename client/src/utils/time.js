export const getStartEndDay = (value) => {
    if (!value) {
        return {
            start: new Date().setHours(0, 0, 0, 0),
            end: new Date().setHours(23, 59, 59, 999)
        }
    }
    return {
        start: new Date(value).setHours(0, 0, 0, 0),
        end: new Date(value).setHours(23, 59, 59, 999)
    }
}

export const getNamedTime = (ms, hasTime, mask) => {
    const date = new Date(ms)
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    const day = date.getDate()
    const month = getNamedMonth(date.getMonth(), 'abbr')

    const getRelativeDayTimestamp = (relativeDay) => {
        return new Date().setDate(new Date().getDate() + relativeDay)
    }

    const weekEnd = getStartEndDay(getRelativeDayTimestamp(7)).end
    const yesterday = getStartEndDay(getRelativeDayTimestamp(-1))
    const tomorrow = getStartEndDay(getRelativeDayTimestamp(1))

    let dayMonth = ''
    if (ms >= yesterday.start && ms <= tomorrow.end) {
        const today = getStartEndDay()
        if (ms >= yesterday.start && ms <= yesterday.end) {
            dayMonth = "Вчера"
        }
        if (ms >= today.start && ms <= today.end) {
            dayMonth = "Сегодня"
        }
        if (ms >= tomorrow.start && ms <= tomorrow.end) {
            dayMonth = "Завтра"
        }
    }
    if (ms > tomorrow.end && ms <= weekEnd) {
        dayMonth = `${getNamedDay(date.getDay(), 'full')}`
    }
    if (ms < yesterday.start || ms > weekEnd) {
        dayMonth = `${day} ${month}`
    }

    switch (mask) {
        case 'time':
            return `${hasTime ? `${hours}:${minutes}` : ''}`
        case 'dateTime':
            return `${dayMonth} ${hasTime ? `${hours}:${minutes}` : ''}`
        default:
            return `${dayMonth} ${hasTime ? `${hours}:${minutes}` : ''}`
    }
}

export const checkTaskTime = (timestamp, date) => {
    const day = getStartEndDay(date)
    return timestamp >= day.start && timestamp <= day.end
}

export const checkOverdueTasks = (timestamp) => {
    const today = getStartEndDay()
    return timestamp < today.start
}

export const getNamedDay = (day, type) => {
    switch (day) {
        case 0:
            switch (type) {
                case 'abbr':
                    return 'Вс'
                case 'full':
                    return 'Воскресенье'
                default:
                    break
            }
            break
        case 1:
            switch (type) {
                case 'abbr':
                    return 'Пн'
                case 'full':
                    return 'Понедельник'
                default:
                    break
            }
            break
        case 2:
            switch (type) {
                case 'abbr':
                    return 'Вт'
                case 'full':
                    return 'Вторник'
                default:
                    break
            }
            break
        case 3:
            switch (type) {
                case 'abbr':
                    return 'Ср'
                case 'full':
                    return 'Среда'
                default:
                    break
            }
            break
        case 4:
            switch (type) {
                case 'abbr':
                    return 'Чт'
                case 'full':
                    return 'Четверг'
                default:
                    break
            }
            break
        case 5:
            switch (type) {
                case 'abbr':
                    return 'Пт'
                case 'full':
                    return 'Пятница'
                default:
                    break
            }
            break
        case 6:
            switch (type) {
                case 'abbr':
                    return 'Сб'
                case 'full':
                    return 'Суббота'
                default:
                    break
            }
            break
        default:
            break;
    }
}

export const getNamedMonth = (month, type, parental = false) => {
    switch (month) {
        case 0:
            switch (type) {
                case 'abbr':
                    return 'янв'
                case 'full':
                    switch (parental) {
                        case true:
                            return 'января'
                        case false:
                            return 'январь'
                        default:
                            break
                    }
                    break
                default:
                    break
            }
            break
        case 1:
            switch (type) {
                case 'abbr':
                    return 'фев'
                case 'full':
                    switch (parental) {
                        case true:
                            return 'февраля'
                        case false:
                            return 'февраль'
                        default:
                            break
                    }
                    break
                default:
                    break
            }
            break
        case 2:
            switch (type) {
                case 'abbr':
                    return 'мар'
                case 'full':
                    switch (parental) {
                        case true:
                            return 'марта'
                        case false:
                            return 'март'
                        default:
                            break
                    }
                    break
                default:
                    break
            }
            break
        case 3:
            switch (type) {
                case 'abbr':
                    return 'апр'
                case 'full':
                    switch (parental) {
                        case true:
                            return 'апреля'
                        case false:
                            return 'апрель'
                        default:
                            break
                    }
                    break
                default:
                    break
            }
            break
        case 4:
            switch (type) {
                case 'abbr':
                    switch (parental) {
                        case true:
                            return 'мая'
                        case false:
                            return 'май'
                        default:
                            break
                    }
                    break
                case 'full':
                    switch (parental) {
                        case true:
                            return 'мая'
                        case false:
                            return 'май'
                        default:
                            break
                    }
                    break
                default:
                    break
            }
            break
        case 5:
            switch (type) {
                case 'abbr':
                    return 'июн'
                case 'full':
                    switch (parental) {
                        case true:
                            return 'июня'
                        case false:
                            return 'июнь'
                        default:
                            break
                    }
                    break
                default:
                    break
            }
            break
        case 6:
            switch (type) {
                case 'abbr':
                    return 'июл'
                case 'full':
                    switch (parental) {
                        case true:
                            return 'июля'
                        case false:
                            return 'июль'
                        default:
                            break
                    }
                    break
                default:
                    break
            }
            break
        case 7:
            switch (type) {
                case 'abbr':
                    return 'авг'
                case 'full':
                    switch (parental) {
                        case true:
                            return 'августа'
                        case false:
                            return 'август'
                        default:
                            break
                    }
                    break
                default:
                    break
            }
            break
        case 8:
            switch (type) {
                case 'abbr':
                    return 'сен'
                case 'full':
                    switch (parental) {
                        case true:
                            return 'сентября'
                        case false:
                            return 'сентябрь'
                        default:
                            break
                    }
                    break
                default:
                    break
            }
            break
        case 9:
            switch (type) {
                case 'abbr':
                    return 'окт'
                case 'full':
                    switch (parental) {
                        case true:
                            return 'октября'
                        case false:
                            return 'октябрь'
                        default:
                            break
                    }
                    break
                default:
                    break
            }
            break
        case 10:
            switch (type) {
                case 'abbr':
                    return 'ноя'
                case 'full':
                    switch (parental) {
                        case true:
                            return 'ноября'
                        case false:
                            return 'ноябрь'
                        default:
                            break
                    }
                    break
                default:
                    break
            }
            break
        case 11:
            switch (type) {
                case 'abbr':
                    return 'дек'
                case 'full':
                    switch (parental) {
                        case true:
                            return 'декабря'
                        case false:
                            return 'декабрь'
                        default:
                            break
                    }
                    break
                default:
                    break
            }
            break
        default:
            break;
    }
}