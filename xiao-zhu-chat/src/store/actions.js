import {
  SET_TIPS
} from './mutations-type'
export default {
  setTips ({ commit }, payload) {
    commit(SET_TIPS, payload)
  }
}
