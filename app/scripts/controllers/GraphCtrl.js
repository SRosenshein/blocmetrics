(function() {
	function GraphCtrl($stateParams, $firebaseArray, $scope, Charts) {
		var graphType = $stateParams.graphType;
		var ref = firebase.database().ref();
		var songPlays = $firebaseArray(ref.child("songPlays"));
    var pageViews = ref.child("pageViews");
    var landingViews = $firebaseArray(pageViews.orderByChild("name").equalTo("landing"));
    var collectionViews = $firebaseArray(pageViews.orderByChild("name").equalTo("collection"));
    var albumViews = $firebaseArray(pageViews.orderByChild("name").equalTo("album"));

		if (graphType === "pie"){
      $scope.options = Charts.getPieChartOptions();
			songPlays.$loaded().then(function(fdata) {
				$scope.data = Charts.getPieChartData(fdata);
			});
		} else if (graphType === 'line') {
			$scope.options = Charts.getLineChartOptions();
      $scope.data = [];
      landingViews.$loaded().then(function(fdata) {
        $scope.data.push({values: Charts.getLineChartData(fdata), key: "Landing Page", color: "#EE0000"});
      });
      collectionViews.$loaded().then(function(fdata) {
        $scope.data.push({values: Charts.getLineChartData(fdata), key: "Collection Page", color: "#00EE00"});
      });
      albumViews.$loaded().then(function(fdata) {
        $scope.data.push({values: Charts.getLineChartData(fdata), key: "Album Page", color: "#0000EE"});
      });
		} // if {}
	} // function GraphCtrl {}

	angular
		.module('blocmetrics')
		.controller('GraphCtrl', ['$stateParams', '$firebaseArray', '$scope', 'Charts', GraphCtrl]);
})();