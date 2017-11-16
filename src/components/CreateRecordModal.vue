<template>
  <ae-modal v-if="visible" title="Create Message" @close="closeHandler">
    <form class="create-record-modal" @submit.prevent="createRecord">
      <label :for="`${_uid}`">
        Message
        <span class="help" :class="{ danger: errors.has('message') }">
          {{errors.first('message')}}
        </span>
      </label>
      <textarea
        placeholder="Express yourself…"
        name="message"
        :id="`${_uid}`"
        v-model="message"
        v-validate="'required|max:300'"
        :class="{ danger: errors.has('message') }"
      />
      <text-muted :style="{ visibility: message.length <= 300 ? 'visible' : 'hidden' }" small>
        Characters left: {{300 - message.length}}
      </text-muted>

      <ae-header-button>Create message</ae-header-button>
    </form>
  </ae-modal>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import { focus } from 'vue-focus';
  import { AeModal, AeHeaderButton } from '@aeternity/aepp-components';
  import TextMuted from './TextMuted';

  export default {
    data() {
      return { message: '' };
    },
    components: { AeModal, TextMuted, AeHeaderButton },
    directives: { focus },
    computed: mapState({
      visible: state => state.wall.createRecordModalShown,
    }),
    methods: {
      ...mapMutations({
        closeHandler: 'toggleCreateRecordModal',
      }),
      async createRecord() {
        const valid = await this.$validator.validateAll();
        if (!valid) return;
        await this.$store.dispatch('createRecord', this.message);
        this.message = '';
        this.$router.push({ name: 'record-list', params: { sort: 'newest' } });
        this.closeHandler();
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '~@aeternity/aepp-components/dist/variables.scss';

  .create-record-modal {
    label {
      text-transform: uppercase;
      font-weight: 500;
      margin-top: 25px;

      .help {
        font-size: 13px;
        float: right;
        text-transform: none;

        &.danger {
          color: $maegenta;
        }
      }
    }

    label, input {
      display: block;
    }
    input, textarea {
      padding: 13px;
      border-radius: 10px;
      font-size: 16px;
      line-height: 26px;
      border: solid 2px $smoke;
      box-shadow: none;
      width: 100%;
      box-sizing: border-box;
      margin: 10px 0;

      ::placeholder {
        color: $grey;
      }

      &.danger {
        border-color: $maegenta;
      }
    }
    input {
      height: 44px;
    }
    textarea {
      min-height: 170px;
    }

    .text-muted {
      display: block;
      text-align: right;
    }

    .ae-header-button {
      display: block;
      margin: 25px auto;
    }
  }
</style>
