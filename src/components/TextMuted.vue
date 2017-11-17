<template>
  <span class="text-muted" :class="{ small, center }"><slot /></span>
</template>

<script>
  export default {
    props: {
      small: { type: Boolean, default: false },
      center: { type: Boolean, default: false },
    },
  };
</script>

<style lang="scss" scoped>
  @import '~aepp-components-davidyuk/dist/variables.scss';

  .text-muted {
    color: $grey;

    &.small {
      font-size: 12px;
    }

    &.center {
      display: block;
      text-align: center;
    }
  }
</style>
