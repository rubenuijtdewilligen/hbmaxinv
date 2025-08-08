import { redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}

	if (locals.pb.authStore.model.collectionName === '_superusers') {
		throw redirect(303, '/dashboard');
	}
};
