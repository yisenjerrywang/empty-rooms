var express = require('express');
var router = express.Router();
var findEmptyTime = require('../findEmptyTime');

var apiToken = '8f299783944ad67bf01956c978853984';
var uwapi = require('uwapi')(apiToken);

/* GET times page. */
router.get('/:building/:room_number', function(req, res, next) {
	uwapi.buildingsCourses({'building_acronym': req.params.building, 'room_number' : req.params.room_number} ).then(function(buildings) {
		findEmptyTime(buildings, function(times) {
			res.render('times', { times: times , building : req.params.building, room_number: req.params.room_number});
		});
	});
});

module.exports = router;
