<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
</script>

<h1>sveltekit-iots-forms</h1>

<form method="POST" use:enhance>
	<label for="name">Name</label> <input type="text" name="name" />

	<label for="email">Email</label> <input type="text" name="email" />

	<label for="delay">Delay</label> <input type="text" name="delay" />ms

	<div>
		<button>Submit</button>
	</div>
</form>

<style lang="scss">
	[data-invalid] {
		color: red;
	}
</style>
