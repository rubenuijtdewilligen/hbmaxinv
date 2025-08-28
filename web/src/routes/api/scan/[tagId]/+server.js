export const GET = async ({ params }) => {
	try {
		console.log(params.tagId);

		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (err) {
		console.error(err);
		return new Response(JSON.stringify({ success: false, message: 'Server error' }), {
			status: 500
		});
	}
};
