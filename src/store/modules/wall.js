/* eslint-disable no-param-reassign, no-console */

import Vue from 'vue';
import Web3 from 'web3';
import BigNumber from 'bignumber.js';
import WallMeta from '../../../truffle/build/contracts/Wall.json';

const decimals = 18;
const defaultRecord = () => ({
  revenue: 0,
  supporters: new Set(),
  lastSupporters: [],
  likeIds: new Set(),
  title: '',
  body: '',
  author: '',
  createdAt: 0,
});
const web3 = new Web3();
let wall;

export default {
  state: () => ({
    account: null,
    blockNumber: 0,
    createRecordModalShown: false,
    supportModalRecord: false,

    records: {},
  }),

  mutations: {
    setAccount(state, account) {
      state.account = account;
    },
    setBlockNumber(state, blockNumber) {
      if (blockNumber < state.blockNumber) return;
      state.blockNumber = blockNumber;
    },
    toggleCreateRecordModal(state) {
      state.createRecordModalShown = !state.createRecordModalShown;
    },
    showSupportModalForRecord(state, address) {
      state.supportModalRecord = address;
    },
    setRecord(state, record) {
      Vue.set(state.records, record.id, {
        ...defaultRecord(),
        ...state.records[record.id],
        ...record,
      });
    },
    likeRecord(state, { id, recordId, supporterAddress, amount, createdAt }) {
      if (!state.records[recordId]) Vue.set(state.records, recordId, defaultRecord());
      const { revenue, likeIds, supporters, lastSupporters } = state.records[recordId];
      if (likeIds.has(id)) return;
      likeIds.add(id);
      supporters.add(supporterAddress);
      state.records[recordId].revenue = revenue + amount;
      lastSupporters.push({ address: supporterAddress, createdAt, amount });
      lastSupporters.sort((a, b) => b.createdAt - a.createdAt);
      lastSupporters.splice(5);
    },
  },

  actions: {
    async fetchLastEvents({ state, commit }) {
      wall.Store({}, { fromBlock: state.blockNumber + 1 }, (error, event) => {
        console.log('store', error, event);
        if (error) throw error;
        commit('setBlockNumber', event.blockNumber);
        const { transactionHash, args: { account, content, createdAt } } = event;
        const p = content.indexOf('\n');
        commit('setRecord', {
          id: transactionHash,
          author: account,
          title: content.slice(0, p),
          body: content.slice(p + 1),
          createdAt: createdAt * 1000,
        });
      });
      wall.Like({}, { fromBlock: state.blockNumber + 1 }, (error, event) => {
        console.log('like', error, event);
        if (error) throw error;
        commit('setBlockNumber', event.blockNumber);
        const { transactionHash, account, amount, createdAt } = event.args;
        commit('likeRecord', {
          id: event.transactionHash,
          recordId: transactionHash,
          supporterAddress: account,
          amount: +amount.shift(-decimals),
          createdAt: createdAt * 1000,
        });
      });
    },
    async init({ state, commit, dispatch }) {
      window.addEventListener('load', async () => {
        if (window.parent.web3) {
          web3.setProvider(window.parent.web3.currentProvider);
        }

        web3.version.getNetwork((err, networkId) => {
          console.log('network id', networkId);
          console.log('wall contract address', WallMeta.networks[networkId].address);
          wall = web3.eth.contract(WallMeta.abi).at(WallMeta.networks[networkId].address);
          console.log('wall', wall);

          dispatch('fetchLastEvents');
          setInterval(() => dispatch('fetchLastEvents'), 60 * 1000);
        });

        setInterval(() => {
          web3.eth.getAccounts(async (error, accounts) => {
            const account = accounts[0];
            if (account === state.account) return;
            commit('setAccount', error || !account ? null : account);
          });
        }, 500);
      });
    },
    createRecord({ state, dispatch }, { title, body }) {
      return new Promise((resolve, reject) =>
        wall.store([title, body].join('\n'), { from: state.account }, (error, result) => {
          if (error) reject(error);
          else {
            resolve(result);
            dispatch('fetchLastEvents');
          }
        }));
    },
    likeRecord({ state, dispatch }, { recordId: transactionHash, revenue: amount }) {
      return new Promise((resolve, reject) =>
        wall.like(transactionHash, (new BigNumber(amount)).shift(decimals),
          { from: state.account }, (error, result) => {
            if (error) reject(error);
            else {
              resolve(result);
              dispatch('fetchLastEvents');
            }
          }));
    },
  },
};
