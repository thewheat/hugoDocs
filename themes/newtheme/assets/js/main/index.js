import { initStore, initColorScheme } from '../components/index';

// Client state.
(function() {
	// Now we know that the browser has JS enabled.
	document.documentElement.classList.remove('no-js');

	// Set up the Spruce data store.
	initStore();
})();

// Turbolinks init.
(function() {
	document.addEventListener('turbolinks:render', function(e) {
		// This is also called right after the body start. This is added to prevent flicker on navigation.
		initColorScheme();
	});

	// Handle form links in Turbolinks.
	document.addEventListener('submit', function(e) {
		let target = e.target;
		if (target.method === 'get') {
			Turbolinks.visit(target.action);
			e.preventDefault();
		}
	});
})();

// AlpineJS controllers.
(function() {
	// hc (Hugo Controller) namespace.
	window.hc = {
		colorSchemeController: function() {
			return {
				isDark: function() {
					return this.$store.userSettings.isDark();
				},
				toggle: function() {
					let old = this.$store.userSettings.colorScheme;
					this.$store.userSettings.colorScheme = old === 'dark' ? 'light' : 'dark';
				}
			};
		}
	};
})();
