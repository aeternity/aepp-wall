import Big from 'big.js'

export default {
	name : 'like',
	props : [
		'message'
	],
	methods: {
		like (artist) {
			console.log(artist, '🌸');
			if (window.globalTokenContract && this.amount > 0.0) {
				const BN = window.globalWeb3.utils.BN;
				const BIGD = (new Big(10)).pow(18);
				const b = window.globalWeb3.eth.abi.encodeParameter('uint256', 0x80).slice(2) + window.globalWeb3.eth.abi.encodeParameter('uint256', 0x14).slice(2) + window.globalWeb3.utils.padRight(artist.slice(2), 64)
				window.globalTokenContract.methods.approveAndCall(
					this.$store.state.contractAddress, 
					(new Big(this.amount)).times(BIGD).toFixed(0), 
					'0x' + b
				)
				.send({from: this.$store.state.identity.address})
				.on('receipt', (r) => { 
					console.log('receipt', r);
				})
				.on('transactionHash', (h) => { console.log('transactionHash', h)})
				.on('error', console.error)
			}
		}
	},
	data () {
		return {
			amount: 0.0
		}
	}
};

