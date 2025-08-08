import { redirect } from '@sveltejs/kit';

export const load = ({ locals, url }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login?redirect=' + encodeURIComponent(url.pathname + url.search));
	}

	return {
		user: locals.pb.authStore.model
	};
};
