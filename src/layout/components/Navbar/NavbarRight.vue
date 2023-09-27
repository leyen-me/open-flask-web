<template>
	<div class="navbar-right">
		<Refresh />
		<Fullscreen />
		<User />
	</div>
</template>

<script setup>
import Refresh from './components/Refresh.vue'
import Fullscreen from './components/Fullscreen.vue'
import User from './components/User.vue'
</script>

<style lang="scss" scoped>
.navbar-right {
	display: flex;
	align-items: center;
	justify-content: flex-end;

	&-link {
		height: 100%;
		display: flex;
		align-items: center;
		white-space: nowrap;

		&-photo {
			width: 25px;
			height: 25px;
			border-radius: 100%;
		}
	}
}

.el-button.is-text {
	width: var(--el-button-size);
}
</style>
