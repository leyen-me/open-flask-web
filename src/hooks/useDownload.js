import axios from 'axios'
import useUserStore from "@/store/modules/userStore"
import { ElLoading, ElMessage } from 'element-plus'

const useDownload = ({url, data = {}, method = 'POST', loading = true}) => {
    const userStore = useUserStore()
    const service = axios.create({
        baseURL: import.meta.env.VITE_APP_BASE_API,
        timeout: 60000,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': userStore.token
        },
        responseType: 'blob',
    }) 

    function download(fileName, blobUrl) {
        const a = document.createElement('a')
        a.download = fileName
        a.href = blobUrl
        a.click()
    }

    return async () => {
        let loadingService = null
        if (loading) {
			loadingService = ElLoading.service({
				fullscreen: true,
				background: 'rgba(0,0,0,0.8)',
				text:"下载中..."
			})
        }
        try {
            let response = null
            if (method === 'POST' || method === 'post') {
                response = await service.post(url, data)
            }
            if (method === 'GET' || method === 'get') {
                response = await service.get(url)
            }
            const blob = new Blob([response.data])
            const blobUrl = window.URL.createObjectURL(blob)
            const fileNameFlag = `attachment; filename=`
            const fileName = response.headers['content-disposition'].split(fileNameFlag)[1]
            download(decodeURIComponent(fileName), blobUrl)
        } catch (e) {
            console.error(e)
            e.message && ElMessage.error(e.message)
        } finally {
            if (loading) {
                loadingService && loadingService.close()
            }
        }
    }
}

export default useDownload
