<template>
  <ae-panel v-if="record" :closeHandler="close">
    <div class="record-detail">
      <span class="author">by {{record.author.slice(0, 8)}}...</span>
      <article>{{record.body}}</article>
      <text-muted>{{record.createdAt | moment('calendar')}}</text-muted>
      <ae-hr branded />
      <record-statistic largeFont :record="record" />
      <ae-hr-button v-if="record.lastSupporters.length" @click="toggleSupporters">
        {{supportersVisible ? 'Hide' : 'Show'}} supporters
      </ae-hr-button>
      <table v-if="supportersVisible">
        <tr v-for="supporter in record.lastSupporters">
          <td>{{supporter.address.slice(0, 8)}}...</td>
          <td><text-muted>{{supporter.createdAt | moment('calendar')}}</text-muted></td>
          <td>{{supporter.amount}} Æ</td>
        </tr>
      </table>
      <ae-header-button @click="showSupportModal">
        <img :src="require('../assets/emoticon-support.png')" />
        Support Author
      </ae-header-button>
    </div>
  </ae-panel>
  <p v-else>This wall record seems to be missing.</p>
</template>

<script>
  import { AePanel, AeHeaderButton, AeHr, AeHrButton } from '@aeternity/aepp-components';
  import TextMuted from './TextMuted';
  import RecordStatistic from './RecordStatistic';

  export default {
    props: ['id'],
    components: {
      AePanel, AeHeaderButton, AeHr, AeHrButton, TextMuted, RecordStatistic,
    },
    data() {
      return { supportersVisible: false };
    },
    computed: {
      record() {
        return this.$store.state.wall.records[this.id];
      },
    },
    methods: {
      close() {
        this.$router.push(this.$store.state.route.from.path);
      },
      showSupportModal() {
        this.$store.commit('showSupportModalForRecord', this.id);
      },
      toggleSupporters() {
        this.supportersVisible = !this.supportersVisible;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css?family=Roboto+Mono:500');
  @import '~@aeternity/aepp-components/dist/variables.scss';

  .record-detail {
    padding: 0 110px;
    overflow: hidden;

    > * {
      margin: 12px 0;
    }

    .author {
      font-family: 'Roboto Mono', monospace;
      color: $maegenta;
      font-size: 16px;
      font-weight: 500;
      letter-spacing: 0.8px;
    }

    h2 {
      margin-top: 12px;
      margin-bottom: 16px;
      font-size: 34px;
      line-height: 50px;
      font-weight: 500;
    }

    article {
      font-size: 20px;
      margin-top: 30px;
      line-height: 28px;
    }

    .proposal-secondary {
      text-align: center;
      margin-bottom: 46px;
    }

    .current-status {
      color: $grey;
      text-align: center;
    }

    table {
      margin: 35px 0;
      width: 100%;

      tr {
        td:nth-child(1) {
          font-size: 16px;
          line-height: 30px;
          font-weight: 500;
          font-family: 'Roboto Mono', monospace;
          width: 1px;
          padding-right: 13px;
        }
        td:nth-child(2) {
          font-size: 14px;
        }
        td:nth-child(3) {
          text-align: right;
          color: $maegenta;
          font-size: 14px;
          font-weight: 500;
        }
      }
    }

    .ae-header-button {
      margin: 35px auto 0 auto;
      display: flex;
      align-items: center;

      img {
        height: 24px;
        margin-right: 15px;
      }
    }

    @media (max-width: $container-width) {
      padding: 0 55px;
    }

    @media (max-width: $screen-phone) {
      padding: 0;

      h2 {
        font-size: 28px;
        line-height: normal;
      }
    }
  }
</style>

<style lang="scss">
  @import '~@aeternity/aepp-components/dist/variables.scss';

  .record-detail {
    .space-around {
      margin-top: 60px;
      margin-bottom: 60px;
      h3 {
        margin: 0;
        font-size: 25px;
        font-weight: 500;
        @media (max-width: $screen-phone) {
          font-size: 21px;
        }
      }
    }
  }
</style>
