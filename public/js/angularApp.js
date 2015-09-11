function QuickView ($http) {
	this.curBuilding = "";
	this.curRoomNum = "";
	this.getTimes = function() {
		$http.get('http://localhost:3000/times/' + this.curBuilding + '/' + this.curRoomNum).then(
		// Success
		function(response) {
			alert(response.data);
		},
		// Error
		function(response) {
			alert("ERROR");
		})
	}
}

angular
	.module('empty-rooms', [])
	.controller('QuickView', QuickView);