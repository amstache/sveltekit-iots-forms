# sveltekit-iots-forms
_Helper lib for validating (form) data in SvelteKit_

## Pre-requisites

```bash
npm install io-ts
```

## Example

### Models

First, create your models. This is an example from the io-ts docs.
Check out the [io-ts docs](https://gcanti.github.io/io-ts/) for more info.

```typescript
import * as T from 'io-ts';
import { PathReporter } from 'io-ts/PathReporter';

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
const SomeInputCodec = T.type({
	delay: Positive
});
type SomeInput = T.TypeOf<typeof SomeInputCodec>;
```

### Validation

In short, all you need to do is to pass whatever it is you need validated,
along with the `Codec` to the `validateForm` function.

```typescript
import { fail } from '@sveltejs/kit';
import { validateForm } from '$lib/server';
import SomeInputCodec from '$lib/models/some-input';

const result = validateForm(SomeInputCodec)(event);
//		^-- result is of type Either<Errors, SomeInput>
if (result._tag === 'Left') return fail(400);

// due to the type guard above, result.right is of type SomeInput
console.log(result.right.delay);
```

### Longer validation example

**WIP**


First, include the parsed form data in the `event.locals` object.
`sk-form-data` does this for you, but you need to include it in the hooks.

```typescript
// src/hooks.server.ts
import { sequence } from '@sveltejs/kit/hooks';
import { form_data } from 'sk-form-data';

export const handle = sequence(form_data);
```

Then, make your form markup. Check the naming conventions used by
`parse-form-data` to see how to name your inputs. For numbers,
prefix it with a `+` sign.

```html
<form method="POST" use:enhance>
	<label for="delay">Delay</label> <input type="number" name="+delay" />ms
	<button>Submit</button>
</form>
```

```typescript
// src/routes/+page.server.ts
import { validateForm } from '$lib/server';
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const actions = {
	default: async (event) => {
		const result = validateForm(SomeInputCodec)(event);
		// alternatively, if you're not using the `form_data` hook provided by `sk-form-data`
		// const result = validateForm(SomeInputCodec)(event.locals.form_data);

		if (result._tag === 'Left') {
			const errors = PathReporter.report(result);
			return fail(400, { errors });
		}

		// result.right is of type SomeInput
		// by this point, `delay` is guaranteed to
		// 1. exist, thanks to the other helper libs
		// 2. be a positive number, thanks to io-ts
		return { delay: result.right.delay };
	}
} satisfies Actions;
```
