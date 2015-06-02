function findEmptyTime(buildings) {
	var days = [ [], [], [], [], [], [], [], [] ];

	var d = new Date();
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
	return today;
}

function makeInt(item, delimiter) {
	var list = item.split(delimiter);
	return parseInt(list[0]) * 100 + parseInt(list[1]);
}

module.exports = findEmptyTime;