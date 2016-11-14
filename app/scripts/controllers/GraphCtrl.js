(function() {
	function GraphCtrl($stateParams) {
		this.graphType = $stateParams.graphType;
	}

	angular
		.module('blocmetrics')
		.controller('GraphCtrl', ['$stateParams', GraphCtrl]);
})();