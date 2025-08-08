export const GET = async ({ locals }) => {
	if (locals.pb.authStore.isValid) {
		await locals.pb.authStore.clear();
	}

	return new Response(null, {
		status: 303,
		headers: {
			location: '/login'
		}
	});
};
