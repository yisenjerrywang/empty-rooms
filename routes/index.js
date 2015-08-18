var express = require('express');
var router = express.Router();

var apiToken = '8f299783944ad67bf01956c978853984';
var uwapi = require('uwapi')(apiToken);

/* GET home page. */
router.get('/', function(req, res, next) {	
	uwapi.buildingsList().then(function(buildings) {
		var buildingsList = [];
		for( var i in buildings ) {
			var building = {
				"building_code" : buildings[i]['building_code'],
				"building_name" : buildings[i]['building_name']
			}
			buildingsList.push(building);
		}
		res.render('index', { title: "Empty Rooms", buildings: buildingsList });
	});
});

module.exports = router;
