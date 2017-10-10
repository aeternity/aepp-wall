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
				/*
				 * approvaAndCall will invoke the receiveApproval function via a raw call, which
				 * has the odd behaviour that the _extraData bytes will be appended as raw bytes
				 * to the end of the calldata, thus we need to manually encode them if we want to
				 * receive the proper array in the receiveApproval. If we don't encode them then
				 * _extraData will just be empty in the receiveApproval function. A dynamic array
				 * is encoded as [_extraData.length][padRight(_extraData, 64)], i.e. the length of
				 * the array followed by the raw data padded to a multiple of 32 bytes. Now for a
				 * function call we also need to encode the offset at which to look for data, which
				 * is 0x80 (i.e. 2x 0x40 for the two uint256).
				 */
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

