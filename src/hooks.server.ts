import { sequence } from '@sveltejs/kit/hooks';
import { form_data } from 'sk-form-data';

export const handle = sequence(form_data);
