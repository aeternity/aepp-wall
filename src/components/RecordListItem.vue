<template>
  <ae-panel
    :to="{ name: 'record', params: { id: this.record.id } }"
    :ratioBottom="1"
  >
    <div class="record-list-item">
      <div class="content">
        <h2>{{record.body}}</h2>
        <text-muted>{{record.createdAt | moment('calendar')}}</text-muted>
        <record-statistic :record="record" />
      </div>
      <div class="arrow">
        <i class="fa fa-angle-right" />
      </div>
    </div>
  </ae-panel>
</template>

<script>
  import { AePanel } from 'aepp-components-davidyuk';
  import TextMuted from './TextMuted';
  import RecordStatistic from './RecordStatistic';

  export default {
    components: { AePanel, TextMuted, RecordStatistic },
    props: ['record'],
  };
</script>

<style lang="scss" scoped>
  @import '~aepp-components-davidyuk/dist/variables.scss';

  .record-list-item {
    display: flex;
    flex-direction: row;

    .content {
      flex-grow: 1;

      h2 {
        margin: 0;
        font-size: 18px;
        line-height: 26px;
        font-weight: normal;
      }

      h2 + .text-muted {
        display: block;
        margin: 8px 0;
      }
    }

    .arrow {
      color: $dark;
      font-size: 28px;
      display: flex;
      margin-left: 30px;

      i {
        margin: auto;
      }
    }
  }
</style>
