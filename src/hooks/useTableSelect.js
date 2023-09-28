import {ref} from 'vue'

export const useTableSelect = ({tableRef, type, emits, close}) => {
    // 选择模式
    const tableSelectionType = ref(type)
    const onTableSelect = (selection, row) => {
        if (tableSelectionType.value === 'single') {
            tableRef.value.clearSelection()
            tableRef.value.toggleRowSelection(row, true)
        }
    }
    const onTableSelectAll = () => {
        if (tableSelectionType.value === 'single') {
            tableRef.value.clearSelection()
        }
    }
    const onTableRowClick = (row) => {
        if (tableSelectionType.value === 'single') {
            tableRef.value.clearSelection()
        }
        tableRef.value.toggleRowSelection(row, undefined)
    }
    const onSubmit = () => {
        const list = tableRef.value.getSelectionRows()
        if (tableSelectionType.value === 'single') {
            emits('change', list[0] ? list[0] : null)
        } else if (tableSelectionType.value === 'multiple') {
            emits('change', list)
        }
        close()
    }
    return {tableSelectionType, onTableSelect, onTableSelectAll, onTableRowClick, onSubmit}
}
