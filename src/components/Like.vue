<template>
	<div class="like">
		<input v-model="amount" type="number" min="0.000000000000000001"> AE token
		<button v-on:click="like(message.sender)">like</button>
	</div>
</template>

<script src='./Like.js'/>

<style scoped>
</style>

