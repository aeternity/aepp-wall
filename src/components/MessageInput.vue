<template>
	<div class="message-input">
		<h1>Message Input</h1>
		<form @submit.prevent="handleSubmit()">
			<input type="text" v-model='currentInput'></input>
			<button>Send</button>
		</form>
	</div>
</template>

<script src='./MessageInput.js'/>

<style scoped>
</style>
