import { initStore } from '../components/index';

// Client state.
(function() {
	document.documentElement.classList.remove('no-js');
	initStore();
})();

// AlpineJS controllers.
(function() {
	// hc (Hugo Controller) namespace.
	window.hc = {
		colorSchemeController: function() {
			return {
				isLoaded: function() {
					return this.$store.userSettings;
				},
				isDark: function() {
					return this.$store.userSettings.colorScheme === 'dark';
				},
				toggle: function() {
					this.$store.userSettings.colorScheme = this.isDark() ? 'light' : 'dark';
				}
			};
		}
	};
})();
