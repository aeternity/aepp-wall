<template>
  <ae-modal v-if="recordId" title="Support Author" @close="closeHandler">
    <form class="create-record-modal" @submit.prevent="likeRecord">
      <img class="icon" :src="require('../assets/icon-message.svg')" />

      <h2>
        Message Wall
        <span>Requests a transaction</span>
      </h2>

      <ae-amount v-model="revenue" :min="0" />

      <text-muted small center>
        Choose the amount of Æ with which you want to support the author
      </text-muted>

      <ae-header-button>
        <img :src="require('../assets/emoticon-transaction.png')" />
        Support
      </ae-header-button>
    </form>
  </ae-modal>
</template>

<script>
  import { mapState } from 'vuex';
  import { focus } from 'vue-focus';

  import { AeModal, AeHeaderButton, AeAmount } from '@aeternity/aepp-components';
  import TextMuted from './TextMuted';

  export default {
    data() {
      return {
        revenue: 1,
      };
    },
    components: { AeModal, AeHeaderButton, AeAmount, TextMuted },
    directives: { focus },
    computed: mapState({
      recordId: state => state.wall.supportModalRecord,
    }),
    methods: {
      closeHandler() {
        this.$store.commit('showSupportModalForRecord');
      },
      async likeRecord() {
        const { recordId, revenue } = this;
        await this.$store.dispatch('likeRecord', { recordId, revenue: +revenue });
        this.closeHandler();
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '~@aeternity/aepp-components/dist/variables.scss';

  .create-record-modal {
    > * {
      margin: 10px 0;
    }

    .icon {
      display: block;
      margin: 40px auto 13px auto;
      background-color: $white;
      width: 64px;
      height: 64px;
      border-radius: 12px;
      box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.2);
      box-sizing: border-box;
      padding: 10px;
    }

    h2 {
      text-align: center;
      font-size: 18px;
      line-height: 28px;
      margin-bottom: 40px;

      span {
        display: block;
        font-size: 12px;
        text-transform: uppercase;
        color: $grey;
        font-weight: 500;
        line-height: 22px;
      }
    }

    .text-muted {
      margin-top: 24px;
    }

    .ae-header-button {
      margin: 92px auto 0 auto;
      display: flex;
      align-items: center;

      img {
        height: 24px;
        margin-right: 15px;
      }
    }
  }
</style>
