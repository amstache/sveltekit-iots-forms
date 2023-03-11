import * as T from 'io-ts';

export const SomeInputRequired = T.type({});
export const SomeInputOptional = T.partial({
	name: T.string,
	email: T.string,
	delay: T.Integer
});
export const SomeInput = T.intersection([SomeInputOptional, SomeInputRequired]);
export type SomeInput = T.TypeOf<typeof SomeInput>;
