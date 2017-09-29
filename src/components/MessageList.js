import Message from './Message.vue'

export default {
	name : 'message-list',
	components: {
		Message
	},
	props : [
		'messages'
	],
};
