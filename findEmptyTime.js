function findEmptyTime(buildings) {
	var days = [ [], [], [], [], [], [], [], [] ];

	var d = new Date("March 7, 2014");
	//gets current date as integer in the form MMDD
	var currDate = ((d.getMonth() + 1) * 100) + d.getDate();

	var today = [];
	
	for( var i in buildings ) {
		var weekdays = buildings[i]['weekdays'];

		//makes time into an integer in the form of HHMM
		var startTime = makeInt(buildings[i]['start_time'], ":");
		var endTime = makeInt(buildings[i]['end_time'], ":");

		//pad 10 mins at the end for class to dip scene
		var periodTime = [startTime, endTime + 10];

		//console.log(buildings[i]);

		//uwapi's way of indicating non-make up lecture is to put in null start and end dates
		if( buildings[i]['start_date'] == null || buildings[i]['end_date'] == null ) {

			if(weekdays.indexOf("M") >= 0) {
				days[1].push(periodTime);
			}
			if(weekdays.indexOf("T") >= 0 && weekdays.indexOf("Th") < 0) {
				days[2].push(periodTime);
			}
			if(weekdays.indexOf("W") >= 0) {
				days[3].push(periodTime);
			}
			if(weekdays.indexOf("Th") >= 0) {
				days[4].push(periodTime);
			}
			if(weekdays.indexOf("F") >= 0) {
				days[5].push(periodTime);
			}
		}
		else {
			//makes date into an integer in the form of MMDD
			var startDate = makeInt(buildings[i]['start_date'], "/");
			var endDate = makeInt(buildings[i]['end_date'], "/");

			//makeup lecture today
			if(startDate <= currDate && currDate <= endDate) {
				today.push(periodTime);
			}
		}
	}

	for(var i in days[d.getDay()]) {
		today.push(days[d.getDay()][i]);
	}
	var allTimes = [];

	//allTimes[i][0]: string representation of time, 0 <= i <= 15
	//allTimes[i][1]: integer representation of time, 0 <= i <= 15
	//allTimes[i][2]: string representation of time, 30 minutes ahead, , 0 <= i <= 15
	//allTimes[i][3]: boolean availability, 0 <= i <= 15
	//times currently go from 8:00 to 22:00 though that might change
	for(var i = 0; i < 15; i ++) {
		allTimes.push([(8 + i) + ":" + "00", (8 + i) * 100 + 30]);
		allTimes.push([(8 + i) + ":" + "30", (8 + i) * 100 + 30]);
	}
	for(var i = 0; i < 29; i ++) {
		allTimes[i].push(allTimes[i + 1][0]);
	}
	//removes 22:00-23:00
	allTimes.pop();
	allTimes.pop();
	//assign default bool status to each time slot
	for(var i in allTimes) {
		allTimes[i].push(true);
	}
	for(var i in today) {
		var startDiff = today[i][0] - 800;
		//number of full hours elapsed since 8:00 * 2
		var startInd = 2 * Math.floor(startDiff / 100);
		//if at the half hour, add 1 to index
		if(startDiff % 100 == 30) {
			startInd ++;
		}
		var endDiff = today[i][1] - 800;
		var endInd = 2 * Math.floor(endDiff / 100);
		if(endDiff % 100 == 30) {
			endInd ++;
		}
		for(var j = startInd; j < endInd; j ++) {
			allTimes[j][3] = false;
		}
	}
	return allTimes;
}

function makeInt(item, delimiter) {
	var list = item.split(delimiter);
	return parseInt(list[0]) * 100 + parseInt(list[1]);
}

module.exports = findEmptyTime;