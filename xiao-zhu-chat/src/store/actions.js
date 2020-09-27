import {
  SET_TIPS,
  SET_CURRENT_USER,
  SET_SELECT_TIPS,
  SET_CHAT_LIST,
  SET_NEW_MSG_NUM
} from './mutations-type'
export default {
  setTips ({ commit }, payload) {
    commit(SET_TIPS, payload)
  },
  setCurrentUser ({ commit }, payload) {
    commit(SET_CURRENT_USER, payload)
  },
  setSelectTips ({ commit }, payload) {
    commit(SET_SELECT_TIPS, [payload[0], payload[1]])
  },
  setChatList ({ commit }, payload) {
    commit(SET_CHAT_LIST, payload)
  },
  setNewMsgNum ({ commit }, payload) {
    commit(SET_NEW_MSG_NUM, payload)
  }
}
