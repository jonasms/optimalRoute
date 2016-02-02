# optimalRoute
Uses the google maps javascript API to deliver the faster route given a number of waypoints

The 'Get Directions' button produces directions according to the start, destination, 
and waypoint values given, placing the waypoints in the order that the waypoint inputs stand (as you see them).

The 'Optimize Route' produces directions placing the waypoints in the most efficient/optimal order.

LIMITATIONS: 
  The app does not work well using specific locations or addresses. Some locations/addresses result in an output of their corresponding    city as opposed to the input address. The app works just fine with cities (ie. Berkekely, San Francisco, San Jose, etc.).

  The Google Maps API allows free users to input up to 8 Waypoints. 

  The 'Optimize Route' function works by producing every possible sequence/combination of the waypoints given.

  An input of 3 waypoints produces 6 different sequences (e.g. ABC, ACB, BCA, BAC, CAB, CBA), which are
  counted by the Map API as 6 different waypoints.

  A 4th waypoint input would require 24 waypoints (4 factorial), which exceeds the permitted quantity of pushed waypoints.

