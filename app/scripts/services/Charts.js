(function() {
	function Charts() {
		var Charts = {};

		var pieChartOptions = {
			chart: {
				type: 'pieChart',
				height: 500,
				x: function(d){return d.key;},
				y: function(d){return d.y;},
				showLabels: true,
				duration: 500,
				labelThreshold: 0.01,
				labelSunbeamLayout: true,
        callback: function () {
          d3.selectAll('.nv-pieLabels text').style('fill', 'white');
        },
				legend: {
					margin: {
						top: 5,
						right: 35,
						bottom: 5,
						left: 0
					}
				},
        tooltip: {
          valueFormatter: function(d) {
            return d3.format('d')(d);
          }
        },
        color: function(d, i) {
        	var colors = ["green", "red", "purple", "pink", "blue"];
          return (d.data && d.data.color) || colors[i % colors.length];
        }
			},
			title: {
				enable: true,
				text: "Song Play Count",
				className: "h2"
			}
		};

		// Counts number of times each song was played and formats into d3 data array
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

		var lineChart = {};

		Charts.getPieChartOptions = function() {
			return pieChartOptions;
		};
		Charts.getPieChartData = function(songs) {
			return countSongPlays(songs);
		};

		return Charts;
	}

	angular
		.module('blocmetrics')
		.factory('Charts', Charts);
})();