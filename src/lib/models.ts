import * as T from 'io-ts';

// Branded positive integers from io-ts samples
// a unique brand for positive numbers
interface PositiveBrand {
	readonly Positive: unique symbol; // use `unique symbol` here to ensure uniqueness across modules / packages
}

const Positive = T.brand(
	T.number, // a codec representing the type to be refined
	(n): n is T.Branded<number, PositiveBrand> => 0 < n, // a custom type guard using the build-in helper `Branded`
	'Positive' // the name must match the readonly field in the brand
);

type Positive = T.TypeOf<typeof Positive>;

export const SomeInputRequired = T.type({
	email: T.string
});
export const SomeInputOptional = T.partial({
	name: T.string,
	delay: Positive
});
export const SomeInputCodec = T.intersection([SomeInputOptional, SomeInputRequired]);
export type SomeInput = T.TypeOf<typeof SomeInputCodec>;
