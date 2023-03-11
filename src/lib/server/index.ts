import { SomeInput } from '$lib/models';
import type { RequestEvent } from '@sveltejs/kit';

export async function validateForm<T extends SomeInput>(
	event: RequestEvent | Request | FormData | null | undefined
) {
	const decoded = SomeInput.decode(event);
	if (decoded._tag === 'Left') {
		return {
			success: false,
			data: decoded.left,
			message: 'Decode unsuccessful',
			errors: decoded.left,
			empty: false
		} as const;
	}
	return {
		success: true,
		data: decoded.right as T,
		message: 'Yay',
		errors: {},
		empty: false
	} as const;
}
