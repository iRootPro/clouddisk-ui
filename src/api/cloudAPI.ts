import axios from "axios"

const instance = axios.create({
    baseURL: 'http://localhost:31337/api/'
})

export const authAPI = {
    registration(email: string, password: string) {
        return instance.post('auth/registration', {
            email,
            password
        })
    },
    login(email: string, password: string) {
        return instance.post('auth/login', {
            email,
            password
        })
    },
    auth() {
        return instance.get('auth/auth', {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
    }
}

export const fileAPI = {
    getFiles(dir: string) {
        return instance.get(`files?${dir ? '?parent' + dir : ''}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
    },

    createDir(name: string, dirId: string) {
        return instance.post('files', {
            name,
            parent: dirId,
            type: 'dir'
        }, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
    }
}
