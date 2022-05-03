export const getToken = (keepLogged = false) => keepLogged
    ? localStorage.getItem('auth')
    : localStorage.getItem('auth')
        ? localStorage.getItem('auth')
        : sessionStorage.getItem('auth')

export const setToken = (token, keepLogged) => {
    if (keepLogged) {
        localStorage.setItem('auth', token)
    } else {
        sessionStorage.setItem('auth', token)
    }
}

const init = (method, data, bodyType) => {
    if (method) {
        if (data) {
            if (!bodyType) {
                return {
                    method,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${getToken()}`
                    },
                    body: JSON.stringify(data)
                }
            }
            if (bodyType === 'FormData') {
                return {
                    method,
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    },
                    body: data
                }
            }
        } else {
            return {
                method,
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            }
        }
    } else {
        return {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    }
}

export const request = async (route, method = null, data = null, bodyType = '') => {
    const response = await fetch(
        `${process.env.REACT_APP_API_URL}api/${route}`,
        init(method, data, bodyType)
    )
    return await response.json()
}