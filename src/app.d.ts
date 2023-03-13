// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			form_data: Record<string, any>;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
