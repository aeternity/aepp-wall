<template>
  <table class="record-statistic">
    <tr :class="{ 'large-font': largeFont }">
      <td>{{record.supporters.size}}</td>
      <td>{{record.revenue.toLocaleString('en')}} Æ</td>
    </tr>
    <tr>
      <td><text-muted>Supporters</text-muted></td>
      <td><text-muted>Total Supported</text-muted></td>
    </tr>
  </table>
</template>

<script>
  import TextMuted from './TextMuted';

  export default {
    components: { TextMuted },
    props: {
      record: Object,
      largeFont: { type: Boolean, default: false },
    },
  };
</script>

<style lang="scss" scoped>
  @import '~@aeternity/aepp-components/dist/variables.scss';

  .record-statistic {
    margin-top: 20px;
    font-size: 16px;
    width: 100%;

    tr {
      &:first-child {
        font-weight: bold;

        &.large-font {
          font-size: 24px;
        }

        td {
          padding-top: 0;
        }
      }
      &:last-child {
        color: $grey;
        td {
          padding-bottom: 0;
        }
      }
      td {
        padding: 1px;
        &:first-child {
          padding-left: 0;
        }
      }
    }
  }
</style>
