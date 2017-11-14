/* eslint-disable no-param-reassign */

import Vue from 'vue';

const randomData = () =>
  new Date(Date.now() - Math.round((Math.random() * 1000 * 60 * 60 * 24 * 360)));
const randomAddress = () => `0x${''.padStart(6, Math.random().toString(16).slice(2))}`;
const randomSupporters = () => (new Array(5)).fill().map(() => ({
  address: randomAddress(),
  createdAt: randomData(),
  amount: (Math.random() * 50).toFixed(2),
}));

export default {
  state: () => ({
    createRecordModalShown: false,
    supportModalRecord: false,
    address: randomAddress(),

    records: {
      1: {
        title: '10 things that you can do with your Æ Tokens!',
        body: 'Example body',
        revenue: 1201,
        supporters: new Set([]),
        author: randomAddress(),
        createdAt: randomData(),
        lastSupporters: randomSupporters(),
      },
      2: {
        title: 'I developed a script that automatically trades BTC, … ETH or $?',
        body: 'Example body',
        revenue: 1200,
        supporters: new Set([1, 2, 3, 4]),
        author: randomAddress(),
        createdAt: randomData(),
        lastSupporters: randomSupporters(),
      },
      3: {
        title: 'Example wall record',
        body: 'Example body',
        revenue: 1200,
        supporters: new Set([1, 4]),
        author: randomAddress(),
        createdAt: new Date(),
        lastSupporters: randomSupporters(),
      },
    },
  }),

  mutations: {
    toggleCreateRecordModal(state) {
      state.createRecordModalShown = !state.createRecordModalShown;
    },
    showSupportModalForRecord(state, address) {
      state.supportModalRecord = address;
    },
    setRecord(state, record) {
      const defaultRecord = {
        revenue: 0,
        supporters: new Set(),
        author: state.address,
        createdAt: new Date(),
      };
      Vue.set(state.records, record.id, Object.assign(defaultRecord, record));
    },
    likeRecord(state, { recordId, supporterAddress, revenue }) {
      const newRevenue = state.records[recordId].revenue + revenue;
      Vue.set(state.records[recordId], 'revenue', newRevenue);
      state.records[recordId].supporters.add(supporterAddress);
    },
  },

  actions: {
    createRecord({ commit, state }, { title, body }) {
      commit('setRecord', {
        id: Math.random().toString(16).slice(2),
        title,
        body,
        revenue: 0,
        supporters: new Set(),
        author: state.address,
        createdAt: new Date(),
      });
      commit('toggleCreateRecordModal');
    },
    likeRecord({ commit, state }, { recordId, revenue }) {
      commit('likeRecord', { recordId, supporterAddress: state.address, revenue });
    },
  },
};
