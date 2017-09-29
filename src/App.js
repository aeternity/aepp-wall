import MessageList from './components/MessageList.vue'
import MessageInput from './components/MessageInput.vue'
import Web3 from 'web3'
import WallContract from './lib/wallContract'

export default {
	name: 'app',
	components: {
		MessageList,
		MessageInput
	},
	computed: {
		messages: function() {
			return this.$store.state.messages;
		}
	},
	methods: {
		initWeb3: function() {
			if (typeof web3 !== 'undefined') {
				web3 = new Web3(web3.currentProvider);
			} else {
				web3 = null;
				// web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
			}
			if (web3) {
				window.globalWeb3 = web3;
				this.initContract(web3);
				this.setAcountInterval(web3);
			}
		},

		initContract: function(web3) {
			window.globalContract = new WallContract(web3, this.$store.state.contractAddress);
			console.log(window.globalContract);
		},

		setAcountInterval: function(web3) {
			setInterval(async () => {
				if (web3) {
					let accounts = await web3.eth.getAccounts();
					let address = accounts[0];
					if (address) {
						let currentAddress = this.$store.state.identity.address;
						if (address != currentAddress) {
							console.log('address changed');
							this.changeUser(address);
						}
					}
				}
			}, 1000);
		},

		changeUser: function(address) {
			this.$store.commit('setAccount', address);
		}
	},
	mounted: function() {
		console.log('mounted');
		this.$store.dispatch('getMessagesFromApi', this.$http);

		window.addEventListener('load', () => {
			this.initWeb3();
		});
	}
}
