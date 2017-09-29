import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import VueResource from 'vue-resource'
//TODO: Critical dependency: the request of a dependency is an expression
import ServerConfig from '../server/config'
// const ServerConfig = require('../server/config');

Vue.use(VueResource)
Vue.use(Vuex)

Vue.config.productionTip = false

const store = new Vuex.Store({
	state: {
		contractAddress: ServerConfig.contractAddress,
		apiBaseUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:3003/api' : '/api',
		messages: [],
		identity: {
			address: null,
			balance: null
		}
	},
	mutations: {
		setMessages(state, messages) {
			state.messages = messages;
		},
		addMessage(state, message) {
			state.messages.push(message);
		},
		setAccount: function (state, account) {
			state.identity.address = account
		},
	},
	actions: {
		async getMessagesFromApi(context, http) {
			http.post(context.state.apiBaseUrl + '/messages/list').then(response => {
				console.log('yay', response);
				if (response.body.success && response.body.messages) {
					context.commit('setMessages', response.body.messages);
				}
			}, response => {
				console.log('nay', response);
			});
		}
	}
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	store,
	render: h => h(App)
})
