export default {
	name: 'message-input',
	data: function() {
		return {
			currentInput: ''
		}
	},
	methods: {
		handleSubmit() {
			this.sendMessage(this.currentInput);
		},
		async sendMessage(messageText) {
			console.log('would send message', messageText);
			let Contract = window.globalContract;
			let from = this.$store.state.identity.address;
			if (Contract) {
				try {
					let method = Contract.methods.store('message', messageText);
					let estimate = await method.estimateGas({
						from: from
					});
					console.log('estimate', estimate);
					let result = await method.send({
						from: from,
						gas: estimate,
						gasPrice: 2000000000
					});
				} catch (e) {
					console.log(e);
				}
			} else {
				console.log('No Contract');
			}
		}
	},
	props: [
	],
};
