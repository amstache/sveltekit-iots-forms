import type { RequestEvent } from '@sveltejs/kit';
import type * as T from 'io-ts';

export function validateForm<C extends T.Mixed>(
	decoder: C
): (event: RequestEvent | Record<string, any> | null | undefined) => T.Validation<T.TypeOf<C>> {
	// TODO: handle these different event types. not sure which are useful
	return (event) => {
		const data = event?.locals?.form_data || event;
		return decoder.decode(data);
	};
}
