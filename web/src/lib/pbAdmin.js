import PocketBase from 'pocketbase';
import { env as publicEnv } from '$env/dynamic/public';
import { env as privateEnv } from '$env/dynamic/private';

const pbAdmin = new PocketBase(publicEnv.PUBLIC_POCKETBASE_URL || 'http://localhost:8090');

pbAdmin.autoCancellation(false);

await pbAdmin
	.collection('_superusers')
	.authWithPassword(privateEnv.PB_ADMIN_EMAIL, privateEnv.PB_ADMIN_PASSWORD, {
		autoRefreshThreshold: 30 * 60
	});

export default pbAdmin;
