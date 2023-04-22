import { setItem, getItem } from "@/utils/storeage/storage"
import { LANG, TAGS_VIEW } from "@/constant"
export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    language: getItem(LANG) || "zh",
    tagsViewList: getItem(TAGS_VIEW) || [],
  }),
  mutations: {
    triggerSiderOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    setLanguage(state, lang) {
      setItem(LANG, lang)
      state.language = lang
    },
    /**
     * 添加 tags
     */
    addTagsViewList(state, tag) {
      const isFind = state.tagsViewList.find((item) => {
        return item.path === tag.path
      })
      if (!isFind) {
        state.tagsViewList.push(tag)
        setItem(TAGS_VIEW, state.tagsViewList)
      }
    },
    /**
     * 为指定的 tag 修改 title
     */
    changeTagView(state, { index, tag }) {
      state.tagsViewList[index] = tag
      setItem(TAGS_VIEW, state.tagsViewList)
    },
    /**
     *
     * @param {*} state
     * @param {*} payload { type: 'other 删除其他 || right 删除右侧 || index 删除当前}
     */
    removeTagsView(state, payload) {
      if (payload.type === "index") {
        state.tagsViewList.splice(payload.index, 1)
      } else if (payload.type === "other") {
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - payload.index + 1
        )
        state.tagsViewList.splice(0, payload.index)
      } else if (payload.type === "right") {
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - payload.index + 1
        )
      }
      setItem(TAGS_VIEW, state.tagsViewList)
    },
  },
}
