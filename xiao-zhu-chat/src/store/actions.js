import {
  SET_TIPS,
  SET_CURRENT_USER
} from './mutations-type'
export default {
  setTips ({ commit }, payload) {
    commit(SET_TIPS, payload)
  },
  setCurrentUser ({ commit }, payload) {
    commit(SET_CURRENT_USER, payload)
  }
}
