import service from '@/utils/request'

export const useOrgListApi = () => {
    return service.get('/sys/org/list')
}

export const useOrgApi = (id) => {
    return service.get('/sys/org/' + id)
}

export const useOrgSubmitApi = (formData) => {
    if (formData.id) {
        return service.put('/sys/org', formData)
    } else {
        return service.post('/sys/org', formData)
    }
}
