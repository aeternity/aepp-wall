<template>
  <ae-modal v-if="recordId" title="Confirm Transaction" @close="closeHandler">
    <form class="create-record-modal" @submit.prevent="likeRecord">
      <div class="icon" />

      <h2>
        Message Wall
        <span>Requests a transaction</span>
      </h2>

      <ae-amount v-model="revenue" :min="0" />

      <text-muted small center>
        To support the message more, you can change the amount of the transaction.
      </text-muted>

      <ae-header-button>Make transaction</ae-header-button>
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
        revenue: 0.5,
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
      likeRecord() {
        const { recordId, revenue } = this;
        this.$store.dispatch('likeRecord', { recordId, revenue: +revenue });
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
      margin: 40px auto 13px auto;
      background-color: $white;
      width: 64px;
      height: 64px;
      border-radius: 12px;
      box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.2);
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
      display: block;
      margin-top: 92px;
      margin-left: auto;
      margin-right: auto;
    }
  }
</style>
