function QuickView () {
	this.curBuilding = "";
}

angular
	.module('empty-rooms', [])
	.controller('QuickView', QuickView);