import helperMixin from '../mixins/helper.js';

export default {
	name : 'message',
	mixins: [
		helperMixin
	],
	props : [
		'message'
	],
};
