import { error, redirect } from '@sveltejs/kit';

export const load = ({ locals, url }) => {
	const redirectTo = url.searchParams.get('redirect') || '/dashboard';

	if (locals.pb.authStore.isValid && locals.pb.authStore.model.collectionName === '_superusers') {
		throw redirect(303, redirectTo);
	}

	return { redirectTo };
};

export const actions = {
	login: async ({ locals, request }) => {
		const body = Object.fromEntries(await request.formData());
		const redirectTo = body.redirect || '/dashboard';

		try {
			await locals.pb.collection('_superusers').authWithPassword(body.email, body.password);
		} catch (err) {
			console.log('Error in /admin login:', err);
			throw error(500, 'Er is iets mis gegaan.');
		}

		throw redirect(303, redirectTo);
	}
};
