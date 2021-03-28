export function initStore() {
	Spruce.store(
		// userSettings gets persisted between page navigations.
		// Access it in a Alpine template with constructs like
		//   $store.userSettings.configFileType
		'userSettings',
		{
			// light or dark mode.
			// If not set, we use the OS setting.
			colorScheme: '',
			// Used to show the most relevant tab in config listings etc.
			configFileType: 'toml',

			isDark() {
				if (!this.colorScheme) {
					return isMediaDark();
				}
				return this.colorScheme === 'dark';
			}
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

function isMediaDark() {
	return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function initColorScheme() {
	// The Spruce store has not have been initialized yet, so access the
	// localStorage directly.
	const userSettingsLocalStorageKey = '__spruce:userSettings';

	let settingsJSON = localStorage[userSettingsLocalStorageKey];
	if (settingsJSON) {
		let settings = JSON.parse(settingsJSON);
		if (settings.colorScheme) {
			// Set by user, always use that.
			toggleDarkMode(settings.colorScheme === 'dark');
			return;
		}
	}

	// Fall back to the OS setting.
	toggleDarkMode(isMediaDark());
}

const toggleDarkMode = function(dark) {
	if (dark) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
};
