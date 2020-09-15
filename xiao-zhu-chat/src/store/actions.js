import {
  SET_TIPS,
  SET_CURRENT_USER,
  SET_SELECT_TIPS
} from './mutations-type'
export default {
  setTips ({ commit }, payload) {
    commit(SET_TIPS, payload)
  },
  setCurrentUser ({ commit }, payload) {
    commit(SET_CURRENT_USER, payload)
  },
  setSelectTips ({ commit }, payload) {
    commit(SET_SELECT_TIPS, payload)
  }
}
