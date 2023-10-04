import appPackage from '../../package.json'

export default {
    // 版本号
    version: appPackage.version,
    // API地址
    apiUrl: import.meta.env.VITE_APP_BASE_API,
    // 文件上传地址
    uploadUrl: import.meta.env.VITE_APP_BASE_API + '/sys/file/upload',
    // 导入用户excel文件
    uploadUserExcelUrl: import.meta.env.VITE_APP_BASE_API + '/sys/user/import',
    // 环境变量
    env: {
        MODE: import.meta.env.MODE,
        PROD: import.meta.env.PROD,
        DEV: import.meta.env.DEV,
        SSR: import.meta.env.SSR
    }
}
