<template>
  <transition name="fade">
    <div
      v-if="isShow"
      class="ctm-modal"
    >
      <component :is="currentModalKey" />
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex';
import modals from '@/store/modals/modals';

export default {
  name: 'ModalBox',
  components: {
    [modals.support]: () => import('./CtmModalSupport'),

  },
  data: () => ({ modals }),
  computed: {
    ...mapGetters({
      isShow: 'modals/getIsShow',
      currentModalKey: 'modals/getCurrentModalKey',
      options: 'modals/getOptions',
    }),
  },
};
</script>

<style lang="scss" scoped>
.ctm-modal {
  @include modalKit;
}
</style>
