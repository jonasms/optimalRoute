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

/*

findTravelTime(bestArray);
console.log("Array: " + bestArray);
console.log("Travel Time: " + travelTime);
console.log("");

variateRoutes(someArray, bestArray, rotate, compareTravelTimes);

//console.log("Array: " + bestArray);
//console.log("Travel Time: " + travelTime)

*/


//--------------------------------------
/*

findTravelTime(bestArray);
console.log("Array: " + bestArray);
console.log("Travel Time: " + travelTime);
console.log("");
rotateSecondary(someArray);
compareTravelTimes(someArray, bestArray);
console.log("Array: " + bestArray);
console.log("Travel Time: " + travelTime);

*/

//callback_1: rotateSecondaryWaypoints
//callback_2: rotatePrimaryWaypoints
//callback_3: compareTravelTimes

/*

function variateRoutes (arr, goal, callback_1, callback_2, callback_3){
	findTravelTime(arr);
	var base = [];
	for (var a = 0; a <= arr.length-1; a++){
		//controls start
		for (var b = 1; b < arr.length; b++){
			//controls search iteration
			for (var c = b;  )
			//rotateSecondary
			callback_1(arr, b);
			//compareTravelTimes
			callback_2(arr, goal);

			console.log("a: " + a + ", b: " + b)
			console.log("Current: " + arr);
			console.log("Optimal: " + goal);
			console.log("Travel Time: " + travelTime);
			console.log("");
		}
			//roatePrimary
			callback_1(arr, 0);
			//compareTravelTimes
			callback_3(arr, goal);

			console.log("a: " + a + ", b: " + b)
			console.log("Current: " + arr);
			console.log("Optimal: " + goal);
			console.log("Travel Time: " + travelTime);
	}

} */

//Change an Array and Apply a Function on the Changed Array
function useArray (arr, iterations, changeArr, applyArr){
		applyArr(changeArr(arr));
}


var myArray = ["A", "B", "C", "D"];
var combinations = [];
combinations.push(myArray.slice(0));

console.log(combinations);

console.log(allCombinations(0, combinations, myArray.slice(0)));
console.log(combinations.length);

console.log(combinations[1]);

//Produce every possible combination of an Array's Elements
function allCombinations (startingIndex, result, lastPush){
	
	for (var i = 1; startingIndex <= result[0].length-2; i++){

		var holder = lastPush.slice(0);
		
		allCombinations(startingIndex + 1, result, holder);

		if (startingIndex + i <= result[0].length-1){
				console.log("lastPush: " + lastPush);
				console.log("startingIndex: " + startingIndex + " " + "i: " + i);
		
				result.push(rotate(lastPush, startingIndex));
		
				//console.log(result);
		} else {
			return result;
			}		
	}
}

//rotates values of an array starting w/ a specified index 'start'
//e.g. ABC will become BCA
function rotate (arr, start){
	var holder = arr[start];
	for (var i = start; i < arr.length-1; i++){
		arr[i] = arr[i+1];
	}
		arr[arr.length-1] = holder;
		return arr.slice(0);

}

//TODO: Retrieve drivingTime for a list of waypoints
function rfact (num) {
	var result = 1;
	for (; num > 1; num--){
		result *= num;
	}
	return result;
}



//rotates all values of an array
function rotateAll (arr){
	var holder = arr[0];
	for (var i = 0; i < arr.length-1; i++){
		arr[i] = arr[i+1];
	}
		arr[arr.length-1] = holder;
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
	if (retrieveNewTravelTime(arr) < travelTime) {
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
	return newTravelTime;
}







