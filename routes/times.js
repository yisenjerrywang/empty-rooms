var express = require('express');
var router = express.Router();
var findEmptyTime = require('../findEmptyTime');

var apiToken = '8f299783944ad67bf01956c978853984';
var uwapi = require('uwapi')(apiToken);

/* GET times page. */
router.get('/', function(req, res, next) {	
	uwapi.buildingsCourses({'building_acronym': "RCH", 'room_number' : 302} ).then(function(buildings) {
		findEmptyTime(buildings, function(times) {
			res.render('times', { times: times });
		});
	});
});

module.exports = router;
