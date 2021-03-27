import { initStore } from '../components/index';

// Client state.
(function() {
	// Now we know that the browser has JS enabled.
	document.documentElement.classList.remove('no-js');

	// Set up the Spruce data store.
	initStore();
})();

// AlpineJS controllers.
(function() {
	// hc (Hugo Controller) namespace.
	window.hc = {
		colorSchemeController: function() {
			return {
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
