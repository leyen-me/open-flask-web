/* 请求基本地址 */
export const BASE_URL = import.meta.env.VITE_APP_BASE_API

/* 上传文件地址 */
export const BASE_UPLOAD_URL = BASE_URL + '/sys/file/upload'

/* 导入用户地址 */
export const BASE_UPLOAD_USER_EXCEL_URL = BASE_URL + '/sys/user/import'

// logo的英文名称
export const LOGO_ENGLISH_NAME = 'back management system'

// 本地存储TOKEN
export const LOCAL_TOKEN = 'access_token'

// 本地存储用户名
export const LOCAL_LOGIN_USERNAME = 'login_u'

// 本地存储密码
export const LOCAL_LOGIN_PASSWORD = 'login_p'

// 登录模式
export const LOGIN_MODEL = {
    ACCOUNT: '账号登录',
    MOBILE: '短信登录'
}

// 请求成功的CODE
export const RESPONSE_SUCCESS_CODE = 0

// 是否开启短信登录，开启则可以访问，未开启则不显示
export const SMS_LOGIN_STATE = true

/* 路由白名单，用户不需要登录也可以访问 */
export const ROUTE_WHITE_LIST = ['/login']
