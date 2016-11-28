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
          d3.selectAll('.nv-pieLabels text').style('font-size', '18px');
          d3.selectAll('.nv-pieLabels text').style('font-weight', 'bold');
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

		var lineChartOptions = {
			chart: {
        type: 'lineChart',
        height: 500,
        margin : {
          top: 20,
          right: 20,
          bottom: 40,
          left: 55
        },
        x: function(d){ return d.x; },
        y: function(d){ return d.y; },
        showValues: true,
        useInteractiveGuideline: true,
        dispatch: {
          stateChange: function(e){ console.log("stateChange"); },
          changeState: function(e){ console.log("changeState"); },
          tooltipShow: function(e){ console.log("tooltipShow"); },
          tooltipHide: function(e){ console.log("tooltipHide"); }
        },
        xAxis: {
          axisLabel: 'Date',
          tickFormat: function(d) {
            return d3.time.format('%x')(new Date(d));
          },
          rotateLabels: 25,
          showMaxMin: false,
          fontSize: 12
        },
        yAxis: {
          axisLabel: 'Number of Page Views',
          axisLabelDistance: -10,
          showMaxMin: true,
          fontSize: 14
        },
        yDomain: [0, 14],
        interactiveLayer: {
          tooltip: {
            headerFormatter: function(d) {
            	return moment(d, 'x').format('MM/DD/YYYY');
            }
          }
        },
        callback: function(chart){
          console.log("!!! lineChart callback !!!");
        }
      },
      title: {
        enable: true,
        text: 'Number of Page Views',
        className: "h2"
      }
		};

		// Generate array of dates between first date in pageViews array and current date to populate x-axis
    var getDateRange = function(startDate) {
      var s = moment(startDate, "MM/DD/YYYY").format();
      var e = moment().format(); //end date (now)
      var a = [];
      var days = moment(e).diff(s, "days");
      
      for(var i = 0; i <= days; i++){
        a.push(s);
        s = moment(s).add(1, "days").format();
      }
      return a;
    };

    // Counts number of page viewsof each page
    var countPageViews = function(views) {
      var data = {};
      //var allDates = getDateRange(views[0].viewedAt);
      var allDates = getDateRange("11/10/2016"); //Will not use hard coded date once there is more data
      angular.forEach(allDates, function(date) {
        data[date] = 0;
      });
      angular.forEach(views, function(view) {
        var date = moment(view["viewedAt"], "MM/DD/YYYY").format();
        data[date] += 1;   
      });

      var lineData = [];
      for(var day in data) {
        var d = moment(day).format('x'); 
        lineData.push({x: d, y: data[day]});
      }
      return lineData;
    };

		Charts.getPieChartOptions = function() {
			return pieChartOptions;
		};
		Charts.getPieChartData = function(songs) {
			return countSongPlays(songs);
		};
		Charts.getLineChartOptions = function() {
			return lineChartOptions;
		};
		Charts.getLineChartData = function(views) {
			return countPageViews(views);
		};

		return Charts;
	}

	angular
		.module('blocmetrics')
		.factory('Charts', Charts);
})();