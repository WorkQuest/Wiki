export default {
  setLoading({ commit }, payload) {
    if (typeof payload === 'boolean') {
      commit('setLoading', payload);
      commit('setStatusText', null);
    }
  },
  showToast(app, value) {
    this._vm.$bvToast.toast(value.text, {
      title: value.title || 'Error',
      variant: 'warning',
      solid: true,
      toaster: 'b-toaster-bottom-right',
      appendToast: true,
      toastClass: 'custom-toast-width',
      bodyClass: 'custom-toast-width',
    });
  },
};
