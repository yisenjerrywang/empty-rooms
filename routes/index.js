var express = require('express');
var router = express.Router();
var findEmptyTime = require('../findEmptyTime');

var apiToken = '8f299783944ad67bf01956c978853984';
var uwapi = require('uwapi')(apiToken);

/* GET home page. */
router.get('/', function(req, res, next) {
	var availTimes = [];
	uwapi.buildingsCourses({'building_acronym': "RCH", 'room_number' : 302} ).then(function(buildings) {
		availTimes = findEmptyTime(buildings);
		res.render('index', { title: 'Empty rooms', times: availTimes });
	});
});

module.exports = router;
