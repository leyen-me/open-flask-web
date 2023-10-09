export default (el, binding) => {
    let pos1 = 0
    let pos3 = 0
    el.onmousedown = (event) => {
        event.preventDefault()
        pos3 = event.clientX
        document.onmousemove = (event) => {
            event.preventDefault()
            pos1 = pos3 - event.clientX
            pos3 = event.clientX
            el.scrollLeft = el.scrollLeft + pos1
        }
        document.onmouseup = event => {
            document.onmouseup = null
            document.onmousemove = null
            document.onmousedown = null
        }
    }
}

