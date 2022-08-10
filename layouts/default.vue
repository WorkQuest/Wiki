<template>
  <div class="primary">
    <Header class="template__header" />
    <div
      class="template__main"
    >
      <nuxt />
    </div>
  </div>
</template>

<script lang="ts">

</script>

<style lang="scss" scoped>
.primary {
  height: 100vh;
  background: $black0;
}

.template {
  &__main {
    display: grid;
    padding-bottom: 80px;
    transition: 1s;
    width: 100%;

    &_padding {
      padding-bottom: 0;
    }
  }
}
</style>
