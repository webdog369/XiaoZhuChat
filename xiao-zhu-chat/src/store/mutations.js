import {
  SET_TIPS
} from './mutations-type'
export default {
  [SET_TIPS] (state, payload) {
    state.Tips = [payload, true]
    setTimeout(() => {
      state.Tips = ['', false]
    }, 1000)
  }
}
