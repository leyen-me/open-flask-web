import useUserStore from "@/store/modules/userStore";

export default (el, binding) => {
    const userStore = useUserStore()
    if (!userStore.authorityList.some((v) => v === binding.value)) {
        el.parentNode.removeChild(el)
    }
}

