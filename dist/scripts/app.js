(function() {
	function config($stateProvider, $locationProvider) {
		$locationProvider
			.html5Mode({
				enabled: true,
				requireBase: false
			});

		$stateProvider
			.state('landing', {
				url: '/',
				templateUrl: '/templates/landing.html',
				controller: 'LandingCtrl as landing'
			})
			.state('about', {
				url: '/about',
				templateUrl: '/templates/about.html'
			})
			.state('graphs', {
				url: '/graphs',
				controller: 'GraphCtrl as graph',
				templateUrl: '/templates/graph.html'
			});
	}

	angular
		.module("blocmetrics", ["firebase", "ui.router", "ui.bootstrap"])
		.config(config);

})();