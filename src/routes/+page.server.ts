import { validateForm } from '$lib/server';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { SomeInputCodec } from '$lib/models';
import { PathReporter } from 'io-ts/PathReporter';

export const load = (async (event) => {
	console.log('page load', { event });
}) satisfies PageServerLoad;

export const actions = {
	default: async (event) => {
		const result = validateForm(SomeInputCodec)(event);

		if (result._tag === 'Left') {
			const errors = PathReporter.report(result);
			return fail(400, { errors });
		}

		return { result: result.right };
	}
} satisfies Actions;
