import service from '@/utils/request'

export const useUserInfoApi = () => {
    return service.get('/sys/user/info')
}

export const updatePasswordApi = (data) => {
    return service.put('/sys/user/password', data)
}

export const useUserApi = (id) => {
    return service.get('/sys/user/' + id)
}

export const useUserExportApi = () => {

}

export const useUserSubmitApi = (formData) => {
    if (formData.id) {
        return service.put('/sys/user', formData)
    } else {
        return service.post('/sys/user', formData)
    }
}
