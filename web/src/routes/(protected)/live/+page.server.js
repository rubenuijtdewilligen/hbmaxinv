export async function load({ locals }) {
	return {
		sessions: await locals.pb.collection('scanner_sessions').getFullList({
			filter: 'end_time = ""',
			expand: 'scanner,employee'
		}),
		authToken: locals.pb.authStore.token
	};
}
