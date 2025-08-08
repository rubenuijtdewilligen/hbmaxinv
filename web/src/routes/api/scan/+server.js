import pbAdmin from '$lib/pbAdmin.js';

export const POST = async ({ request }) => {
	try {
		const { scanner_id, tag_data } = await request.json();

		if (!scanner_id || !tag_data) {
			return new Response(
				JSON.stringify({ success: false, message: 'scanner_id and tag_data are required' }),
				{ status: 400 }
			);
		}

		if (tag_data.startsWith('employee_')) {
			const employeeId = tag_data.replace('employee_', '');

			const activeSessions = await pbAdmin.collection('scanner_sessions').getFullList({
				filter: `scanner = "${scanner_id}" && end_time = ""`
			});

			if (activeSessions.length > 0) {
				const session = activeSessions[0];

				await pbAdmin.collection('scanner_sessions').update(session.id, {
					end_time: new Date()
				});

				return new Response(JSON.stringify({ success: true }), { status: 200 });
			} else {
				await pbAdmin.collection('scanner_sessions').create({
					scanner: scanner_id,
					employee: employeeId,
					start_time: new Date()
				});

				return new Response(JSON.stringify({ success: true }), { status: 200 });
			}
		}
	} catch (err) {
		console.error(err);
		return new Response(JSON.stringify({ success: false, message: 'Server error' }), {
			status: 500
		});
	}
};
