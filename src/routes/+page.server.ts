import { validateForm } from '$lib/server';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { SomeInput } from '$lib/models';

export const load = (async (event) => {
	console.log('page load', { event });
}) satisfies PageServerLoad;

export const actions = {
	default: async (event) => {
		const result = await validateForm<SomeInput>(event);

		if (!result.success) return fail(400, { result });

		return { success: result.success };
	}
} satisfies Actions;
