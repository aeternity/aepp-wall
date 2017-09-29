<template>
	<div class="message-list">
		<h1>Message List</h1>
		<Message v-for="message in messages" :message='message' :key="message._id"></Message>
	</div>
</template>

<script src='./MessageList.js'/>

<style scoped>
</style>
