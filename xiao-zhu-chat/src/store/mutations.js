import {
  SET_TIPS,
  SET_CURRENT_USER,
  SET_SELECT_TIPS
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
  },
  [SET_SELECT_TIPS] (state, payload) {
    state.SelectTips = [payload[0], payload[1], payload[2]]
  }
}
