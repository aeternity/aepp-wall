/* eslint-disable no-param-reassign */

import Vue from 'vue';
import Web3 from 'web3';
import BigNumber from 'bignumber.js';
import IPFS from 'ipfs-mini';
import Bluebird from 'bluebird';
import IdManagerProvider from '@aeternity/id-manager-provider';
import WallMeta from '../../../truffle/build/contracts/Wall.json';
import ERC20Meta from '../../../truffle/build/contracts/ERC20.json';

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
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
let wall;
let wallAddress;
let erc20;
const idManager = new IdManagerProvider({
  skipSecurity: process.env.NODE_ENV === 'development',
});

ipfs.addJSONAsync = Bluebird.promisify(ipfs.addJSON);
ipfs.catJSONAsync = Bluebird.promisify(ipfs.catJSON);

export default {
  state: () => ({
    account: null,
    createRecordModalShown: false,
    supportModalRecord: false,

    records: {},
  }),

  mutations: {
    setAccount(state, account) {
      state.account = account;
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
    async fetchNewRecordsAndLikes({ state: { records }, commit }) {
      const fetchedRecordsCount = Object.keys(records).length;
      const recordsCount = +await wall.methods.recordCount().call();

      await Promise.all([
        ...(new Array(recordsCount - fetchedRecordsCount)).fill().map(async (_, idx) => {
          const recordId = idx + fetchedRecordsCount;
          const { author, content, createdAt } = await wall.methods.records(recordId).call();
          commit('setRecord', {
            ...await ipfs.catJSONAsync(content),
            id: recordId,
            author,
            createdAt: createdAt * 1000,
          });
          return null;
        }),
        ...(new Array(recordsCount)).fill().map(async (_, recordId) => {
          const fetchedLikeCount = records[recordId] ? records[recordId].likeIds.size : 0;
          const likeCount = await wall.methods.recordLikeCount(recordId).call();
          await Promise.all(new Array(likeCount - fetchedLikeCount).fill().map(async (__, idx) => {
            const id = idx + fetchedLikeCount;
            const [supporterAddress, amount, createdAt] =
              Object.values(await wall.methods.recordLike(recordId, id).call());
            commit('likeRecord', {
              id,
              recordId,
              supporterAddress,
              amount: +(new BigNumber(amount)).shift(-decimals),
              createdAt: createdAt * 1000,
            });
            return null;
          }));
          return null;
        }),
      ]);
    },
    async init({ state, commit, dispatch }) {
      window.addEventListener('load', async () => {
        if (await idManager.checkIdManager()) {
          web3.setProvider(idManager.web3.currentProvider);
        } else if (window.parent.web3) {
          web3.setProvider(window.parent.web3.currentProvider);
        }

        wallAddress = '0xe5c7ab141e6d8a9866cf0176907497b82ae58f48';
        wall = new web3.eth.Contract(WallMeta.abi, wallAddress);
        erc20 = new web3.eth.Contract(ERC20Meta.abi, '0x35d8830ea35e6Df033eEdb6d5045334A4e34f9f9');

        dispatch('fetchNewRecordsAndLikes');
        setInterval(() => dispatch('fetchNewRecordsAndLikes'), 60 * 1000);

        setInterval(() => {
          web3.eth.getAccounts(async (error, accounts) => {
            const account = accounts[0];
            if (account === state.account) return;
            commit('setAccount', error || !account ? null : account);
          });
        }, 500);
      });
    },
    async createRecord({ state, dispatch }, { title, body }) {
      const multiHash = await ipfs.addJSONAsync({ title, body });
      const promiEvent = wall.methods.store(multiHash).send({ from: state.account });
      promiEvent.on('receipt', () => { dispatch('fetchNewRecordsAndLikes'); });
      await promiEvent;
    },
    async likeRecord({ state, dispatch }, { recordId, revenue: amount }) {
      const encodeUint256 = uint256 => web3.eth.abi.encodeParameter('uint256', uint256);
      const promiEvent = erc20.methods.approveAndCall(
        wallAddress,
        (new BigNumber(amount)).shift(decimals),
        encodeUint256(32 * 4) + encodeUint256(32).slice(2) + encodeUint256(recordId).slice(2),
      ).send({ from: state.account });
      promiEvent.on('receipt', () => dispatch('fetchNewRecordsAndLikes'));
      await promiEvent;
    },
  },
};
