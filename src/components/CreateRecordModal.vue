<template>
  <ae-modal v-if="visible" title="Create Message" @close="closeHandler">
    <form class="create-record-modal" @submit.prevent="createRecord">
      <label :for="`${_uid}-title`">
        Title
        <span class="help" :class="{ danger: errors.has('title') }">
          {{errors.first('title')}}
        </span>
      </label>
      <input
        placeholder="Enter catchy headline …"
        name="title"
        :id="`${_uid}-title`"
        v-model="title"
        v-focus.lazy="true"
        v-validate="'required'"
        :class="{ danger: errors.has('title') }"
      />

      <label :for="`${_uid}-body`">
        Body
        <span class="help" :class="{ danger: errors.has('body') }">
          {{errors.first('body')}}
        </span>
      </label>
      <textarea
        placeholder="Write your message …"
        name="body"
        :id="`${_uid}-body`"
        v-model="body"
        v-validate="'required'"
        :class="{ danger: errors.has('body') }"
      />

      <ae-header-button>Create message</ae-header-button>
      <text-muted small center>character count: {{body.length}}</text-muted>
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
      return {
        title: '',
        body: '',
      };
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
        const { title, body } = this;
        await this.$store.dispatch('createRecord', { title, body });
        Object.assign(this, { title: '', body: '' });
        this.$router.push({ name: 'record-list', params: { sort: 'newest' } });
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

    label {
      text-transform: uppercase;
      font-weight: 500;
      margin-top: 25px;
      margin-bottom: 10px;

      .help {
        font-size: 16px;
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
      padding: 26px;
      border-radius: 10px;
      font-size: 16px;
      line-height: 26px;
      border: solid 2px $smoke;
      box-shadow: none;
      width: 100%;
      box-sizing: border-box;

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
      min-height: 200px;
    }

    .ae-header-button {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
  }
</style>
