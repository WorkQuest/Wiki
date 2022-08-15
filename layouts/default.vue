<template>
  <div
    class="primary"
    :class="{'stop-scrolling':isShow}"
  >
    <Header class="template__header" />
    <div
      class="template__main"
    >
      <nuxt />
    </div>
    <Footer
      class="template__footer"
      @clickOnLogo="toWorkQuestWebsite"
    />
    <ctm-modal />
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      isShow: 'modals/getIsShow',
    }),
  },
  methods: {
    toWorkQuestWebsite() {
      window.location.href = 'https://app.workquest.co';
    },
  },
}

</script>

<style lang="scss" scoped>
.primary {
  height: 100%;
  background: $black0;
}

.stop-scrolling{
  overflow: hidden;
  height: 100vh;
}

.template {
  &__main {
    background-color: inherit;
    display: grid;
    padding-bottom: 80px;
    transition: 1s;
    width: 100%;

    &_padding {
      padding-bottom: 0;
    }
  }
}

@include _350 {
  max-width: 320px;
}
</style>
