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
			.state('dashboard', {
				url: '/dashboard',
				templateUrl: '/templates/dashboard.html'
			})
			.state('graph', {
				templateUrl: '/templates/graph.html',
				controller: 'GraphCtrl as graph',
				url: '/dashboard/:graphType'
			});
	}

	angular
		.module("blocmetrics", ["firebase", "ui.router", "ui.bootstrap", "nvd3"])
		.config(config);

})();