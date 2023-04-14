export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
  }),
  mutations: {
    triggerSiderOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    },
  },
}
