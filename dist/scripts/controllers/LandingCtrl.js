(function() {
	function LandingCtrl(){
		console.log("Home");
	}

	angular
		.module('blocmetrics')
		.controller('LandingCtrl', LandingCtrl);
})();