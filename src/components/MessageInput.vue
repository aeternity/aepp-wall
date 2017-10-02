<template>
	<div class="message-input">
		<form @submit.prevent="handleSubmit()">
			<input type="text" v-model='currentInput'></input>
			<button>Send</button>
		</form>
	</div>
</template>

<script src='./MessageInput.js'/>

<style scoped>
</style>
