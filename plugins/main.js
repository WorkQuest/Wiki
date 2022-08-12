import Vue from 'vue';
import modals from '~/store/modals/modals';
import { mapActions } from 'vuex'

Vue.mixin({
  methods: {
    ...mapActions({
      modal: 'modals/show',
      hide: 'modals/hide',
    }),
    ShowModal(payload) {
      this.modal({
        key: modals.default,
        ...payload,
      });
    },
    CloseModal() {
      this.hide();
    },
    SetLoader(payload) {
      this.$store.dispatch('main/setLoading', payload);
    },
  }
})
