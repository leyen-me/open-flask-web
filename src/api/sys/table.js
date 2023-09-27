import service from '@/utils/request'

export const useTableApi = (id) => {
	return service.get('/sys/online/table/' + id)
}

export const useTableSubmitApi = (formData) => {
	if (formData.id) {
		return service.put('/sys/online/table', formData)
	} else {
		return service.post('/sys/online/table', formData)
	}
}
