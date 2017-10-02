export default {
	methods: {
		readableTimestamp: function (timestamp) {
			if (timestamp) {
				let date = new Date(timestamp * 1000),
				datevalues = [
					date.getFullYear(),
					date.getMonth()+1,
					date.getDate(),
					date.getHours(),
					date.getMinutes(),
					date.getSeconds(),
				];
				return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
			} else {
				return ''
			}
		},
		etherscanLink: function (value, type) {
			// type tx, address, block
			let baseurl = 'https://kovan.etherscan.io/'
			baseurl += type
			baseurl += '/'
			baseurl += value
			return baseurl
		}
	}
}
