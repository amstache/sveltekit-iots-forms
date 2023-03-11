import type { RequestEvent } from '@sveltejs/kit';
import type * as T from 'io-ts';

export function validateForm<C extends T.Mixed>(
	decoder: C
): (event: RequestEvent | Request | FormData | null | undefined) => T.Validation<C> {
	// TODO: handle these different event types. not sure which are useful
	return (event) => decoder.decode(event);
}
