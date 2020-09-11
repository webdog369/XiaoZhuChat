import {
  SET_TIPS,
  SET_CURRENT_USER
} from './mutations-type'
export default {
  [SET_TIPS] (state, payload) {
    state.Tips = [payload, true]
    setTimeout(() => {
      state.Tips = ['', false]
    }, 1000)
  },
  [SET_CURRENT_USER] (state, payload) {
    state.currentUser = payload
  }
}
