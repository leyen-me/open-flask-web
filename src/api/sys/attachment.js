import service from '@/utils/request'

export const useAttachmentSubmitApi = (formData) => {
	return service.post('/sys/attachment', formData)
}
