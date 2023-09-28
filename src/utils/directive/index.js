import {auth} from './auth'
import {drag} from './drag'

export const directive = (app) => {
    // 权限指令
    auth(app)
    // 手势拖动
    drag(app)
}
