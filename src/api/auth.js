import service from '@/utils/request'

export const useCaptchaApi = () => {
    return service.get('/sys/auth/captcha')
}

export const useCaptchaEnabledApi = () => {
    return service.get('/sys/auth/captcha/enabled')
}

export const useSendCodeApi = (mobile) => {
    return service.post('/sys/auth/send/code?mobile=' + mobile)
}

export const useAccountLoginApi = (data) => {
    return service.post('/sys/auth/login', data)
}

export const useMobileLoginApi = (data) => {
    return service.post('/sys/auth/mobile', data)
}

export const useLogoutApi = () => {
    return service.post('/sys/auth/logout')
}