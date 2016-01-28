//TODO: how to find absolute value of an algebraic operation e.g. |3 - 5|

var origin = 0;
var waypoint_1 = 5;
var waypoint_2 = 12; 
var waypoint_3 = 8;
var waypoint_4 = 3;
var travelTime = 0;
var newTravelTime = 0;

var route = [waypoint_1, waypoint_2, waypoint_3, waypoint_4];
var optimalRoute = route;

var someArray = [1,4,2,3];
var bestArray = someArray;

//retrieve travelTime of first directions
//function is for testing purposes
function findTravelTime (arr){
	travelTime = Math.abs(arr[0] - origin);
	for (i = 0; i < arr.length-1; i++){
		travelTime += Math.abs(arr[i]-arr[i+1]);
	}
}

//callback_1: rotateSecondaryWaypoints
//callback_2: rotatePrimaryWaypoints
//callback_3: retrieve travelTime of current waypoint order
function variateRoutes (waypoints, optimal, callback_1, callback_2, callback_3){
	findTravelTime(waypoints);

	for (var a = 0; a < (waypoints.length-1); a++){
		rotateSecondary(waypoints);
		compareTravelTimes(waypoints, optimal);
	}
}

function rfact (num) {
	var result = 1;
	for (; num > 1; num--){
		result *= num;
	}
	return result;
}
//rotates all values of an array except for arr[0]
//so [ 1, 2, 3, 4] results in [1, 3, 4, 2]
function rotateSecondary (arr){
	var holder = arr[1];
	for (var i = 1; i < arr.length-1; i++){
		arr[i] = arr[i+1];
	}
		arr[arr.length-1] = holder;

}

//rotates only the first value of an array
//so [1, 2, 3, 4] results in [2, 3, 4, 1]
function rotatePrimary (arr){
	var holder = arr[0];
		for (var i = 0; i < arr.length-1; i++){
			arr[i] = arr[i+1];
		}
		arr[arr.length-1] = holder;
}

//function is for testing purposes
function compareTravelTimes (arr, optimal) {
	retrieveNewTravelTime(arr);
	if (newTravelTime < travelTime) {
		travelTime = newTravelTime;
		optimal = arr;
	}
}

//function is for testing purposes
function retrieveNewTravelTime (arr){
	newTravelTime = Math.abs(arr[0] - origin);
	for (i = 0; i < arr.length-1; i++){
		newTravelTime += Math.abs(arr[i]-arr[i+1]);
	}
}

/*
findTravelTime(bestArray);
console.log(travelTime);

rotateSecondary(someArray);
compareTravelTimes(someArray, bestArray);
console.log(travelTime);
*/

