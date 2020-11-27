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
        return instance.get(`files?${dir ? 'parent=' + dir : ''}`, {
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
    },

    uploadFile(file: any, dirId: string) {
        const formData = new FormData()
        formData.append('file', file)
        if (dirId) {
            formData.append('parent', dirId)
        }
        return instance.post('files/upload', formData, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
            onUploadProgress: progressEvent => {
                const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                console.log('total', totalLength)
                if (totalLength) {
                    let progress = Math.round((progressEvent.loaded * 100) / totalLength)
                    console.log(progress)
                }
            }
        })
    },

}

export async function downloadFile(file: any) {
    const response = await fetch(`http://localhost:31337/api/files/download?id=${file.file._id}`, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    if (response.status === 200) {
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = file.file.name
        document.body.appendChild(link)
        link.click()
        link.remove()
    }
}
