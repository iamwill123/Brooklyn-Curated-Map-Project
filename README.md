# Brooklyn Curated - Neighborhood Map Project
## Purpose: Udacity's Front End Web Development Nanodegree

Live Demo site: [https://iamwill123.github.io/Brooklyn-Curated-Map-Project/]

### Overview
A map of curated Brooklyn hotspots I have either visited or want to visit in Brooklyn NYC (Mainly Williamsburg area).

### Technologies used:

#### Languages:
- HTML5 & CSS3
- Javascript

#### Libraries:
- w3schools CSS library
- Material lite template
- Knockout.js
- jQuery

#### APIs:
- Google Maps Javascript API
- Google Places Library
- Google Directions API
- Yelp API 2.0

#### License
All code is provided under the MIT license.

### The App Overview

#### The Venue List
The list of venue locations are generated from the model.js data file. The markers on the google maps are also generated from the lat-long data provided in the model.js file.

#### Search Feature
This feature, located on the top right hand corner, allows you to filter and center on the venue location 'live' according to the venue name.

#### Marker infowindow
The infowindow is rendered upon a user's click either on the google map's marker or selected from the left hand side navigation bar. The rendered infowindow data is a compilation of requests from a mixture of Yelp's API, Google Maps API, and the model.js file.

#### Obstacles along the way
The toughest obstacles along the way was to figure out how to encorporate a functional image slider. Clearing the directions route after a user is done using it.

#### Features in the work
- Auto-text completion and upon enter key it will display the venue's infowindow.
- A directions panel that activates when the directions api is used.
- Use CSS or JS to calculate a reasonable distance between the header bar and infowindow.


