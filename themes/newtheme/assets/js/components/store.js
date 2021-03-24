export function initStore() {
	Spruce.store(
		// userSettings gets persisted between page navigations.
		// Access it in a Alpine template with constructs like
		//   $store.userSettings.configFileType
		'userSettings',
		{
			// light or dark mode.
			colorScheme: 'light',
			// Used to show the most relevant tab in config listings etc.
			configFileType: 'toml'
		},
		true // Store it in localStorage
	);

	Spruce.watch('userSettings.colorScheme', function(val) {
		toggleDarkMode(val === 'dark');
	});

	Spruce.started(function() {
		//
	});
}

export function initColorScheme() {
	// The Spruce store has not have been initialized yet, so access the
	// localStorage directly.
	const userSettingsLocalStorageKey = '__spruce:userSettings';
	let darkSetByUser =
		userSettingsLocalStorageKey in localStorage && localStorage[userSettingsLocalStorageKey].includes('dark');

	// Fall back to the OS setting.
	toggleDarkMode(darkSetByUser || window.matchMedia('(prefers-color-scheme: dark)').matches);
}

const toggleDarkMode = function(dark) {
	if (dark) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
};
