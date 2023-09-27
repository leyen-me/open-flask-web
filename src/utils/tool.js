import constant from '@/utils/constant'

// 把路径转换成驼峰命名
export const pathToCamel = (path) => {
    return path.replace(/\/(\w)/g, (all, letter) => letter.toUpperCase())
}

// 是否外链
export const isExternalLink = (url) => {
    return /^(https?:|\/\/|http?:|\/\/|^{{\s?apiUrl\s?}})/.test(url)
}

// 替换外链参数
export const replaceLinkParam = (url) => {
    return url.replace('{{apiUrl}}', constant.apiUrl)
}

// 转换文件大小格式
export const convertSizeFormat = (size) => {
    const unit = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB']
    let index = Math.floor(Math.log(size) / Math.log(1024))
    let newSize = size / Math.pow(1024, index)
    // 保留的小数位数
    return newSize.toFixed(2) + ' ' + unit[index]
}

// 获取svg图标(id)列表
export const getIconList = () => {
    const rs = []
    const list = document.querySelectorAll('svg symbol[id^="icon-"]')
    for (let i = 0; i < list.length; i++) {
        rs.push(list[i].id)
    }
    return rs
}

// 获取字典Label
export const getDictLabel = (dictList, dictType, dictValue) => {
    const type = dictList.find(element => element.dictType === dictType)
    if (type) {
        const val = type.dataList.find((element) => element.dictValue === dictValue + '')
        if (val) {
            return val.dictLabel
        } else {
            return dictValue
        }
    } else {
        return dictValue
    }
}

// 获取字典Label样式
export const getDictLabelClass = (dictList, dictType, dictValue) => {
    const type = dictList.find(element => element.dictType === dictType)
    if (type) {
        const val = type.dataList.find((element) => element.dictValue === dictValue + '')
        if (val) {
            return val.labelClass
        } else {
            return ''
        }
    } else {
        return ''
    }
}

// 获取字典数据列表
export function getDictDataList(dictList, dictType) {
    const type = dictList.find((element) => element.dictType === dictType)
    if (type) {
        return type.dataList
    } else {
        return []
    }
}