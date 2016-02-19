// == Global Variables ==

var inputCount = 0;
var infoCardCount = 0;
var varArr = ["startVar", "endVar", "durVar"];

// == Button Reference Assignments ==

var container = document.getElementsByClassName('contain');
  
var clearButtonSolid = document.getElementById('clearButtonSolid');
var addButtonSolid = document.getElementById('addButtonSolid');
var goButtonSolid = document.getElementById('goButtonSolid');
var optimizeButton = document.getElementById('optimizeButton');

var clearButtonFloat = document.getElementById('clearButtonFloat');
var addButtonFloat = document.getElementById('addButtonFloat');
var goButtonFloat = document.getElementById('goButtonFloat');

// == Panel Transformations and Functions ==

//DESCRIPTION: change positions of panels (solid & float)
function changePanel(){
  container[0].classList.toggle('panel-change');
}

//DESCRIPTION: copies Origin & Destination input values from floatingPanel to solidPanel 
var floatToSolid = function() {
  document.getElementById('startSolid').value = document.getElementById('startFloat').value;
  document.getElementById('endDestinationSolid').value = document.getElementById('endDestinationFloat').value;
};

//DESCRIPTION: create new destination/waypoint input HTML elements
var createInput = function () {
  if (inputCount < 3){
    inputCount++;            
    var solidPanelDiv = document.getElementById('solidPanel');
    var inputBody = solidPanelDiv.children[1].cloneNode(true);
    var icon = inputBody.getElementsByTagName('div')[1];
    var input = inputBody.getElementsByTagName('input')[0];

    icon.innerHTML = "";

    input.className += 'waypoint-field';
    input.id = 'waypoint_' + (inputCount);
    input.value = "";
    input.placeholder = "Enter Waypoint";
    solidPanelDiv.insertBefore(inputBody, solidPanelDiv.children[1+inputCount]);

    destinationAutoComplete = new google.maps.places.Autocomplete((document.getElementById('waypoint_' + (inputCount))));         
  } 
};

//DESCRIPTION: deletes waypoint input fields & supporting div's
function deleteWaypoints () {
  var targetNode;
  var waypointInputs = document.getElementsByClassName('waypoint-field');
  var waypointsArr = toArr(waypointInputs);

  waypointsArr.forEach(function (){
    targetNode = document.getElementById('solidPanel');
    targetNode.removeChild(targetNode.getElementsByClassName('nav-row-Solid')[1]);
  });

  inputCount = 0;
}

//clears all input fields
function clearInputs () {
  var inputFields = document.getElementsByTagName('input');

  Array.prototype.forEach.call(inputFields, function (element){
    element.value = "";
  });
}

// == Waypoint Operations (retrieving and processing) ==

//DESCRIPTION: produces every possible sequence/order of the elements of an array
//ex. ABC ==> ABC, ACB, BCA, BAC, CAB, CBA
function allCombinations (startingIndex, result, lastPush){

  for (var i = 1; startingIndex <= result[0].length-2; i++){

    var holder = lastPush.slice(0);
    
    allCombinations(startingIndex + 1, result, holder);

    if (startingIndex + i <= result[0].length-1){
      result.push(rotate(lastPush, startingIndex));   
    } else {return result;}   
  }
}

//DESCRIPTION: stores waypoints in an array
var storeWaypoints = function () {
  var waypointsArr = [];
  var waypointInputs = document.getElementsByClassName('waypoint-field');

  waypointsArr = Array.prototype.map.call(waypointInputs, function (waypoint) {
      waypointObj = {};
      waypointObj.location = waypoint.value;
      return waypointObj;
  });

  return waypointsArr;
};

//DESCRIPTION: stores waypoints of the current Optimal Route in a passed-in array
function storeOptimalWaypoints (element) {
  if(element.end_address !== element[element.length-1].end_address){
    optimalRoute.push({location: element.end_address});}
}

//assigns the optimal travel duration to optimatlTravleTime
function setMostEfficient (current, optimal, action) {
  if (current < optimal || optimal === 0){
    optimal = current;
    if (typeof action === 'function'){ 
      action();
      return optimal;
    } 
  } 
  return optimal;

}

// == Display Route Information == 

//DESCRIPTION: display route info such as
//start_address, end_address, duration
function displayRouteInfo (routeInfo){
  var legInfoArr = routeInfo;
  var idArr = [];

  deleteRouteInfo();

  //convert duration number from seconds to hours
  legInfoArr.map(function (element){
    element[2] = secsToHours(element[2]);
  });

  legInfoArr.forEach(function (element, Index){
    //create HTML for each card displaying the route's info
    createRouteInfoCard();

    //assign placeholders unique id's
    idArr = assign(varArr, [getId], setId);

    //assign values to unique placeholders
    element.forEach(function (el, ind){
      assign([el], idArr[ind], setValue);
    });
  });   
}

//DESCRIPTION: deletes any existing 
//route info cards before production of more
function deleteRouteInfo () {
  infoCardCount = 0;

  if (document.getElementsByClassName('legInfoCard') !== null){
    var routeInfoDisplay = document.getElementById('routeInfoDisplay');
    routeInfoDisplay.innerHTML = "";
  }
}

//DESCRIPTION: create a card (iteration)
//of route info
function createRouteInfoCard () {
  infoCardCount++;

  var routeInfoDisplay = document.getElementById('routeInfoDisplay');

  //this is ugly and confusing
  //received errors when new lines were placed between the ""'s 
  var infoCard =  "<div class='legInfoCard'>";
  infoCard += "<div class='placesInfo infoLeft'>";
  infoCard += "<div class='infoDiv'>";
  infoCard += "<div class='infoTitle'>Start: </div>";
  infoCard += "<div id='startVar' class='infoContent'></div>";
  infoCard += "</div>";
  infoCard += " <div class='infoDiv'>";
  infoCard += "<div class='infoTitle'>End: </div>";
  infoCard += "<div id='endVar' class='infoContent'></div>";
  infoCard += "</div> </div>";
  infoCard += "<div class='infoDiv durationInfo infoRight'>";
  infoCard += "<div id='durVar' class='timeNum'></div>";
  infoCard += "<div class='timeText'>Hours</div>";
  infoCard += "</div> </div> </div>";

  routeInfoDisplay.innerHTML += infoCard;
}

// == Utility Functions == 

//DESCRIPTION: utility function for 
//calling a function on each element 
//of two arrays
function assign (contentArr, propertyArr, callback){
  var newArr = [];

  newArr = contentArr.map(function (priEl){
    return propertyArr.map(function (secEl){
      return callback(priEl, secEl);
    });
  });
  return newArr;
}

//DESCRIPTION: Utility function for
//rotating values of an array starting 
//with a specified index 'start'
//e.g. ABC will become BCA
function rotate (arr, start){
  var holder = arr[start];
  for (var i = start; i < arr.length-1; i++){
    arr[i] = arr[i+1];
  }
    arr[arr.length-1] = holder;
    return arr.slice(0);
}

//DESCRIPTION: utility function for 
//retrieving the value of an object's property
function getPropertyVal (obj, property){
  var propArr = [];
  var val = obj;

  propArr = property.split('.');
  propArr.forEach(function (element) {
    val = val[element];
  });
  return val;
}

//DESCRIPTION: utility functions for
//converting seconds into hours
function secsToHours (seconds) {
  var hours = (seconds/60)/60;
  return Math.round(100*hours)/100;
}

//DESCRIPTION: utility function for
//setting the innerHTML of an html element
//to the value of a javascript element
function setValue (value, target){
    getId(target).innerHTML = value;
}

//DESCRIPTION: utility function for
//set the id of a given property to given name
function setId(name, property){
  name = property(name);
  name.id = name.id + '_' + infoCardCount;
  return name.id;
}

//DESCRIPTION: utility function for
//retrieving the reference of an 
//html element of a given id
function getId (id){
  return document.getElementById(id);
}

//DESCRIPTION: utility function
//for converting an array-like object
//into an array
function toArr (arrLike) {
  return Array.prototype.slice.call(arrLike);
}

//DESCRIPTION: enables and disables optimizeRouteButton
function testOptimize () {
        if (inputCount > 1){
          optimizeButton.disabled = false;
        } else { optimizeButton.disabled = true;} 
}

// == Goolge Maps API ==

  

function initMap() {
  //Google Map Api Default Code
  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.7833, lng: -122.4167},
    zoom: 13
  });


  //DESCRIPTION: initializes AutoComplete for input fields
  startAutocomplete = new google.maps.places.Autocomplete((document.getElementById('startFloat')));

  endAutocomplete = new google.maps.places.Autocomplete((document.getElementById('endDestinationFloat')));

  startAutocompleteSolid = new google.maps.places.Autocomplete((document.getElementById('startSolid')));

  destination_1AutocompleteSolid = new google.maps.places.Autocomplete((document.getElementById('endDestinationSolid')));

  places = new google.maps.places.PlacesService(map);

  //DESCRIPTION: Changes map Location to address selected from AutoComplete
  startAutocomplete.addListener('place_changed', onPlaceChanged);

  //Google Map Api Default Code
  function onPlaceChanged() {
    var place = startAutocomplete.getPlace();
    if (place.geometry) {
      map.panTo(place.geometry.location);
      map.setZoom(15);
    } else {
      document.getElementById('startFloat').placeholder = 'Enter Origin Address';
    }
  }



  //DESCRIPTION: Calculates and displays directions
  directionsDisplay.setMap(map);


  //DESCRIPTION: Button Handlers
  function goButtonFloatHandler () {
    floatToSolid();
    changePanel();
    calcRoute(storeWaypoints(), false);
   }

  function goButtonSolidHandler () {
    storeWaypoints();
    calcRoute(storeWaypoints(), false);
   }

  function addButtonFloatHandler () {
    floatToSolid();
    createInput();
    changePanel();
   }

  function clearButtonSolidHandler () {
    deleteWaypoints();
    clearInputs();
    deleteRouteInfo();
    changePanel();
    testOptimize();
   }

  function addButtonSolidHandler () {
    createInput();
    testOptimize();
    //makeDeleteButtonHandlers();
   }

  function optimizeButtonHandler () {
    calcRoute(storeWaypoints(), true);
   }       

  //DESCRIPTION: Assignment of Button Actions
  goButtonFloat.addEventListener('click', goButtonFloatHandler);
  addButtonFloat.addEventListener('click', addButtonFloatHandler);
  clearButtonFloat.addEventListener('click', clearInputs);

  goButtonSolid.addEventListener('click', goButtonSolidHandler);
  addButtonSolid.addEventListener('click', addButtonSolidHandler);
  clearButtonSolid.addEventListener('click', clearButtonSolidHandler);
  optimizeButton.addEventListener('click', optimizeButtonHandler);

  function calcRoute(waypoints, optimizeRoute) {

    //TODO: organize var's by type (num, arr, etc.)
    var start = document.getElementById('startSolid').value;
    var destination_1 = document.getElementById('endDestinationSolid').value;          
    var waypointsArray = [];
    var routeProperties = ["start_address", "end_address", "duration.value"];
    var durationValues = [];
    var travelTime = 0;
    var optimalTravelTime = 0;
    routeInfo = [];
    optimalRoute = [];
    var numRoute = 0;
    var gateOpen = true;

    if (waypoints.length > 0){
      waypointsArray.push(waypoints.slice(0));
    }

    //IF optimizing route produce an array 
    //of all possible waypoint sequences
    if (optimizeRoute){
      allCombinations (0, waypointsArray, waypoints.slice(0)); 
    }

    var x = 0;
    do {  
      var request = {
        origin: start,
        destination: destination_1,
        waypoints: waypointsArray[x],
        optimizeWaypoints: false, //I build this feature
        travelMode: google.maps.TravelMode.DRIVING
     };
     x++;

      directionsService.route(request, function(result, status) {
        
        travelTime = 0;

        //TODO: simplify? use w/out valuesNameArr
        routeInfo = assign(result.routes[0].legs, routeProperties, getPropertyVal);

        if (waypointsArray.length > 1){

          durationValues = routeInfo.map(function (el){
            return el[2];
          });

          travelTime = durationValues.reduce(function (previousVal, currentVal){return previousVal + currentVal;});

        }

        if (optimizeRoute){
          optimalTravelTime = setMostEfficient(travelTime, optimalTravelTime, function(){

            optimalRouteInfo = routeInfo;
            optimalRoute = optimalRouteInfo.map(function (el){
              return {location: el[1]};
            });

            //delete the value at the last index in order to avoid mapping error
            optimalRoute.pop();
          });

          if (numRoute === waypointsArray.length-1 && gateOpen){
            gateOpen = false;
            displayRouteInfo(optimalRouteInfo);
            calcRoute(optimalRoute, false);
          } 
        } else if (status === google.maps.DirectionsStatus.OK) {
            displayRouteInfo(routeInfo);
            directionsDisplay.setDirections(result);
            }

        numRoute++;                  
      });
    } while (x < waypointsArray.length);
  } 
}


