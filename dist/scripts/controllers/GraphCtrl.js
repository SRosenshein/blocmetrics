(function() {
	'use strict';
	function GraphCtrl($stateParams, $firebaseArray, $scope) {
		var graphType = $stateParams.graphType;
		var ref = firebase.database().ref();
		var songPlays = $firebaseArray(ref.child("songPlays"));

		var countSongPlays = function(songPlaysArray) {
			var data = {};
			angular.forEach(songPlaysArray, function(song) {
				data[song.title] ? data[song.title] += 1 : data[song.title] = 1;		
			});
			var pieData = [];
			for(var title in data) {
				pieData.push({key: title, y: data[title]});
			}
			return pieData;		
		};

		if (graphType === "pie"){
			$scope.options = {
				chart: {
					type: 'pieChart',
					height: 500,
					x: function(d){return d.key;},
					y: function(d){return d.y;},
					showLabels: true,
					duration: 500,
					labelThreshold: 0.01,
					labelSunbeamLayout: true,
					legend: {
						margin: {
							top: 5,
							right: 35,
							bottom: 5,
							left: 0
						}
					}
				},
				title: {
					enable: true,
					text: "Song Play Count",
					className: "h2"
				}
			};
			songPlays.$loaded().then(function(fdata) {
				$scope.data = countSongPlays(fdata);
			});
		}
	}

	angular
		.module('blocmetrics')
		.controller('GraphCtrl', ['$stateParams', '$firebaseArray', '$scope', GraphCtrl]);
})();