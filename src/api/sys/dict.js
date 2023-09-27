import service from '@/utils/request'

export const useDictTypeAllApi = () => {
    return service.get('/sys/dict/type/all')
}

export const useDictTypeApi = (id) => {
    return service.get('/sys/dict/type/' + id)
}

export const useDictTypeSubmitApi = (formData) => {
    if (formData.id) {
        return service.put('/sys/dict/type', formData)
    } else {
        return service.post('/sys/dict/type', formData)
    }
}

export const useDictDataApi = (id) => {
    return service.get('/sys/dict/data/' + id)
}

export const useDictDataSubmitApi = (formData) => {
    if (formData.id) {
        return service.put('/sys/dict/data', formData)
    } else {
        return service.post('/sys/dict/data', formData)
    }
}
