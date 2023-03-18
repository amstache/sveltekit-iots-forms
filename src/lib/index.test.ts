import { describe, it, expect } from 'vitest';
import { validateForm } from '$lib';
import * as t from 'io-ts';

// This is an example from the io-ts docs.
interface PositiveBrand {
	readonly Positive: unique symbol;
}

const Positive = t.brand(
	t.number, // a codec representing the type to be refined
	(n): n is t.Branded<number, PositiveBrand> => 0 < n, // a custom type guard using the build-in helper `Branded`
	'Positive' // the name must match the readonly field in the brand
);
type Positive = t.TypeOf<typeof Positive>;
const SomeInputCodec = t.type({
	delay: Positive
});
type SomeInput = t.TypeOf<typeof SomeInputCodec>;

describe('when passing FormData-like', () => {
	it('does the thing', () => {
		const formData = {
			delay: 100
		};

		const actual = validateForm(SomeInputCodec)(formData);
		expect(actual._tag).toBe('Right');
	});

	it('does the other thing', () => {
		const formData = {
			delay: '100'
		};

		const actual = validateForm(SomeInputCodec)(formData);
		expect(actual._tag).toBe('Left');
	});
});
