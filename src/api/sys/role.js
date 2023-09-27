import service from '@/utils/request'

export const useRoleMenuApi = () => {
    return service.get('/sys/role/menu')
}

export const useRoleApi = (id) => {
    return service.get('/sys/role/' + id)
}

export const useRoleListApi = () => {
    return service.get('/sys/role/list')
}

export const useRoleSubmitApi = (formData) => {
    if (formData.id) {
        return service.put('/sys/role', formData)
    } else {
        return service.post('/sys/role', formData)
    }
}

export const useRoleDataScopeSubmitApi = (formData) => {
    return service.put('/sys/role/data-scope', formData)
}

export const useRoleUserSubmitApi = (roleId, formData) => {
    return service.post('/sys/role/user/' + roleId, formData)
}
