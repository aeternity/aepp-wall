import helperMixin from '../mixins/helper.js';
import Like from './Like.vue'

export default {
	name : 'message',
	mixins: [
		helperMixin
	],
	components: {
		Like
	},
	props : [
		'message'
	],
};
