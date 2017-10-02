<template>
	<div class="message">
		<div class="sender"><a :href='etherscanLink(message.sender, "address")' target='_blank'>{{message.sender}}</a></div>
		<div class="blockNumber"><a :href='etherscanLink(message.blockNumber, "block")' target='_blank'>{{message.blockNumber}}</a></div>
		<div class="content"><a :href='etherscanLink(message.transactionId, "tx")' target='_blank'>{{message.content}}</a></div>
		<div class="timestamp">{{ readableTimestamp(message.blockTimestamp) }}</div>
	</div>
</template>

<script src='./Message.js'/>

<style scoped>
</style>
