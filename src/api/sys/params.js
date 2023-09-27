import service from '@/utils/request'

export const useParamsApi = (id) => {
    return service.get('/sys/params/' + id)
}

export const useParamsSubmitApi = (formData) => {
    if (formData.id) {
        return service.put('/sys/params', formData)
    } else {
        return service.post('/sys/params', formData)
    }
}
