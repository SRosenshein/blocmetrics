(function() {
	function HomeCtrl(){
		console.log("Home");
	}

	angular
		.module('blocmetrics')
		.controller('HomeCtrl', HomeCtrl);
})();