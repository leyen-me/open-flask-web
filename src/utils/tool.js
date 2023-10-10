import {BASE_URL} from "@/constants";

/* 把路径转换成驼峰命名 */
export const pathToCamel = (path) => {
    return path.replace(/\/(\w)/g, (all, letter) => letter.toUpperCase())
}

/* 是否外链 */
export const isExternalLink = (url) => {
    return /^(https?:|\/\/|http?:|\/\/|^{{\s?apiUrl\s?}})/.test(url)
}

/* 替换外链参数 */
export const replaceLinkParam = (url) => {
    return url.replace('{{apiUrl}}', BASE_URL)
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
export const getDictLabel = (dict_list, dict_type, dict_value) => {
    const type = dict_list.find(element => element.dict_type === dict_type)
    if (type) {
        const val = type.data_list.find((element) => element.dict_value === dict_value + '')
        if (val) {
            return val.dict_label
        } else {
            return dict_value
        }
    } else {
        return dict_value
    }
}

// 获取字典Label样式
export const getDictLabelClass = (dict_list, dict_type, dict_value) => {
    const type = dict_list.find(element => element.dict_type === dict_type)
    if (type) {
        const val = type.data_list.find((element) => element.dict_value === dict_value + '')
        if (val) {
            return val.label_class
        } else {
            return ''
        }
    } else {
        return ''
    }
}

// 获取字典数据列表
export function getDictDataList(dict_list, dict_type) {
    const type = dict_list.find((element) => element.dict_type === dict_type)
    if (type) {
        return type.data_list
    } else {
        return []
    }
}


