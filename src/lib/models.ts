import * as T from 'io-ts';

export const SomeInputRequired = T.type({
	email: T.string
});
export const SomeInputOptional = T.partial({
	name: T.string,
	delay: T.Int
});
export const SomeInputCodec = T.intersection([SomeInputOptional, SomeInputRequired]);
export type SomeInput = T.TypeOf<typeof SomeInputCodec>;
