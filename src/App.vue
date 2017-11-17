<template>
  <ae-main>
    <ae-header-alert v-if="alert" @close="closeAlert">
      {{alert}}
    </ae-header-alert>
    <ae-header v-else name="Message Wall">
      <ae-header-button @click="toggleCreateRecordModal()">
        <i class="fa fa-plus" /> Create New
      </ae-header-button>

      <ae-add-button
        slot="mobile-right"
        icon
        @click="toggleCreateRecordModal()"
      />
    </ae-header>

    <router-view />

    <create-record-modal />
    <support-author-modal />
  </ae-main>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import {
    AeMain, AeHeader, AeHeaderButton, AeHeaderAlert, AeAddButton,
  } from '@aeternity/aepp-components';
  import CreateRecordModal from './components/CreateRecordModal';
  import SupportAuthorModal from './components/SupportModal';

  export default {
    beforeCreate() {
      this.$store.dispatch('init');
    },
    components: {
      AeMain,
      AeHeader,
      AeHeaderButton,
      AeHeaderAlert,
      AeAddButton,
      CreateRecordModal,
      SupportAuthorModal,
    },
    computed: mapState({
      alert: state => state.wall.alert,
    }),
    methods: {
      ...mapMutations({
        toggleCreateRecordModal: 'toggleCreateRecordModal',
      }),
      closeAlert() {
        this.$store.commit('setAlert');
      },
    },
  };
</script>

<style lang="scss">
  @import "../node_modules/font-awesome/css/font-awesome.css";
</style>
