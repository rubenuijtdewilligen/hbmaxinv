<script>
	import PocketBase from 'pocketbase';
	import { onMount } from 'svelte';
	import { env } from '$env/dynamic/public';
	import { LiveScanner } from '$lib/components';

	export let data;

	let sessions = data.sessions;

	onMount(async () => {
		const pb = new PocketBase(env.PUBLIC_POCKETBASE_URL);

		try {
			pb.authStore.save(data.authToken, null);
		} catch (err) {
			console.error('Failed to restore session', err);
		}

		pb.collection('scanner_sessions').subscribe('*', async () => {
			sessions = await pb.collection('scanner_sessions').getFullList({
				filter: 'end_time = ""',
				expand: 'scanner,employee'
			});
		});
	});
</script>

<div class="flex flex-col h-[100vh]">
	<div class="navbar bg-primary text-white flex justify-between items-center p-4">
		<div class="flex flex-row items-center">
			<img src="/logo.svg" alt="Logo HB Max Event Solutions" class="h-12 p-1 bg-white rounded-sm" />
			<span class="text-2xl font-bold ml-4"> Live Scanner Informatie </span>
		</div>
		<a href="/logout" class="text-2xl font-bold mr-4 link">Uitloggen</a>
	</div>

	{#if sessions.length === 0}
		<h1 class="text-center text-4xl font-bold mt-48">Geen scanners in gebruik</h1>
	{:else if sessions.length === 1}
		<LiveScanner session={sessions[0]} />
	{:else}
		<div class="grid grid-cols-2 grow">
			{#each sessions as s, index}
				<div
					class={index % 2 === 0 ? 'border-r-primary border-r-4' : 'border-l-primary border-l-3'}
				>
					<LiveScanner session={s} />
				</div>
			{/each}
		</div>
	{/if}
</div>

<style></style>
