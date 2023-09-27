export const isExternalLink = (path) => {
    return /^(https?:|mailto:|tel:)/.test(path)
}

export const validateEmail = (rule, value, callback) => {
    const reg =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (reg.test(value)) {
        callback()
    } else {
        callback(new Error('邮箱格式不正确'))
    }
}

export const validatePassword = (rule, value, callback) => {
    if (value.length < 4) {
        callback(new Error('密码不能小于4位数'))
    } else {
        callback()
    }
}

export const validateMobile = (mobile) => {
    return /^1[3456789]\d{9}$/.test(mobile)
}
