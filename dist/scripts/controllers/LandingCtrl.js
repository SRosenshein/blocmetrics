(function() {
	function LandingCtrl(){
		this.landingTitle = "Welcome to Blocmetrics!";
	}

	angular
		.module('blocmetrics')
		.controller('LandingCtrl', LandingCtrl);
})();