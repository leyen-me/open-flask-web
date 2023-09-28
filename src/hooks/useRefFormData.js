import {ref} from 'vue'
import _ from 'lodash'


const useRefFormData = (data) => {
    const initData = _.cloneDeep(data)
    const dataForm = ref(_.cloneDeep(data))
    const reset = () => {
        for (let k in dataForm.value) {
            dataForm.value[k] = initData[k]
        }
    }
    const assign = (obj) => {
        for (let k in initData) {
            const item = obj[k]
            if (item === undefined || item === null) {
                dataForm.value[k] = initData[k]
            } else {
                dataForm.value[k] = item
            }
        }
    }
    return {
        dataForm,
        reset,
        assign
    }
}

export default useRefFormData
