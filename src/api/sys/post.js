import service from '@/utils/request'

export const usePostApi = (id) => {
	return service.get('/sys/post/' + id)
}

export const usePostSubmitApi = (formData) => {
	if (formData.id) {
		return service.put('/sys/post', formData)
	} else {
		return service.post('/sys/post', formData)
	}
}

export const usePostListApi = () => {
	return service.get('/sys/post/list')
}
