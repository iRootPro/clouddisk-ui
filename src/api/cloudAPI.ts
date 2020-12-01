import axios from "axios"
import {Dispatch} from "react";
import {addUploadFileAC, changePercentUploadAC, showUploaderAC} from "../reducers/uploadReducer";
import {addFileAC} from "../reducers/fileReducer";
import {v1} from "uuid"


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

    uploadFile: (file: any, dirId: string) => async (dispatch: Dispatch<any>) => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            if (dirId) {
                formData.append('parent', dirId)
            }
            const uploadFile = {name: file.name, progress: 0, id: v1()}
            dispatch(showUploaderAC())
            dispatch(addUploadFileAC(uploadFile))
            const res = await instance.post('files/upload', formData, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    if (totalLength) {
                        uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
                        dispatch(changePercentUploadAC(uploadFile))
                    }
                }
            })
            dispatch(addFileAC(res.data))
        } catch (e) {
            console.log(e)
        }
    },

    deleteFile(file: any) {
        return instance.delete(`files?id=${file.file._id}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
    }
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
