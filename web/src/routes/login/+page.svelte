<script>
	export let data;
</script>

<div
	class="w-[100vw] h-[100vh] flex flex-col items-center"
	style="background-image: url('/kermis-reusel-bg.jpg'); background-size: cover; background-position: center;"
>
	<div class="h-full flex flex-row items-center">
		<div class="flex flex-col items-center">
			<div class="w-full bg-white p-6 rounded-sm">
				<img src="/logo.svg" alt="Logo HB-Max Event Solutions" class="w-full" />
				<h3 class="text-xl text-center mt-3 -mb-3 font-bold">Inventory Management System</h3>
			</div>
			<div class="w-full bg-white p-6 rounded-sm mt-8">
				<h1 class="text-3xl font-bold">Inloggen</h1>
				<form
					action="?/login"
					method="POST"
					class="flex w-full flex-col items-center space-y-2 pt-4"
				>
					<input type="hidden" name="redirect" value={data.redirectTo} />
					<div class="form-control w-full max-w-md">
						<label for="email" class="label pb-1 font-medium">
							<span class="label-text">E-mailadres</span>
						</label>
						<input type="email" name="email" class="input input-bordered w-full max-w-md" />
					</div>
					<div class="form-control w-full max-w-md">
						<label for="password" class="label pb-1 font-medium">
							<span class="label-text">Wachtwoord</span>
						</label>
						<input type="password" name="password" class="input input-bordered w-full max-w-md" />
					</div>
					<div class="w-full max-w-md pt-2">
						<button type="submit" class="btn btn-primary font-introrust w-full">Inloggen</button>
					</div>
				</form>
			</div>
		</div>
	</div>
	<p class="text-white mb-3">
		Software ontwikkeld door
		<a href="https://rbnu.nl" class="text-white underline">Ruben Uijtdewilligen</a>.
	</p>
</div>
