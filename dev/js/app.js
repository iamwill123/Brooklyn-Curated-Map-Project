'use strict';

var map, infoWindow;

// Create the google map zoomed in on Williamsburg BK upon initialization
var initMaps = function() {
  console.log("Google Maps Successfully loaded!");
  // Initialize Google Maps
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.708116, lng: -73.957070}, // Williamsburg Brooklyn NYC
    zoom: 12,
    mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        position: google.maps.ControlPosition.TOP_RIGHT,
        mapTypeIds: ['roadmap', 'terrain', 'styled_tron', 'styled_vibrant']
      }
  });

  infoWindow = new google.maps.InfoWindow({
    maxWidth: 400,
    maxHeight: 570
  });

  // Custom Tron Style
  var stylesTron = new google.maps.StyledMapType([{"featureType":"all","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"off"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural.landcover","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural.terrain","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#00ffff"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#00fbff"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway.controlled_access","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#00fffb"},{"lightness":18}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#00ffff"},{"lightness":16}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19},{"visibility":"off"}]},{"featureType":"transit","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.station","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000303"},{"lightness":17}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]}],{name:'Tron'});
  // Custom Vibrant Style
  var stylesVibrant = new google.maps.StyledMapType([{featureType:"water",stylers:[{color:"#19a0d8"}]},{featureType:"administrative",elementType:"labels.text.stroke",stylers:[{color:"#ffffff"},{weight:6}]},{featureType:"administrative",elementType:"labels.text.fill",stylers:[{color:"#e85113"}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#efe9e4"},{lightness:-40}]},{featureType:"transit.station",stylers:[{weight:9},{hue:"#e85113"}]},{featureType:"road.highway",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"labels.text.stroke",stylers:[{lightness:100}]},{featureType:"water",elementType:"labels.text.fill",stylers:[{lightness:-100}]},{featureType:"poi",elementType:"geometry",stylers:[{visibility:"on"},{color:"#f0e4d3"}]},{featureType:"road.highway",elementType:"geometry.fill",stylers:[{color:"#efe9e4"},{lightness:-25}]}],{name:'Vibrant'});

  // Tron styles
  map.mapTypes.set('styled_tron', stylesTron);
  map.setMapTypeId('styled_tron');
  // Vibrant styles
  map.mapTypes.set('styled_vibrant', stylesVibrant);
  map.setMapTypeId('styled_vibrant');

  var trafficLayer = new google.maps.TrafficLayer();

  // Toggle traffic layer
  document.getElementById('toggle-traffic').addEventListener('click', function() {
    toggleTraffic();
  });

 var toggleTraffic = function() {
    //Traffic layer
    if (trafficLayer.getMap() == null) {
      trafficLayer.setMap(map);
    } else {
      trafficLayer.setMap(null);
    }
  };
   // Start your engines
  ko.applyBindings( new ViewModel() );
};

// Error handling
var mapsErrorHandler = function() {
  console.log("Google maps api failed to load");
  var errorContent = "<h1> Hello User! </h1>" + "<h2>The map did not load properly, please refresh and try again.</h2>";
  $('#map').html(errorContent);
};


// Set up the ViewModel
var ViewModel = function() {

  var self = this;

  self.venueList = ko.observableArray([]);

// Filtered Search
  // Marker Filter
  self.filteredVenueList = ko.observableArray([]);
  // List Filter
  self.filter = ko.observable('');

  // Create the list of venueLocations from the model.js file
  self.buildVenueLocations = function() {
    venueLocations.forEach(function(venueItem) {
      self.venueList.push( new Venue(venueItem) );
    });
  };

  // Set up an event listener for clicks for each venue
  self.setVenueClickFunctions = function() {
    self.venueList().forEach(function(venue) {
      google.maps.event.addListener(venue.marker(), 'click', function() {
        self.venueClick(venue);
      });
    });
  };

  // Function to handle clicking on a venue (either in list or marker)
  self.venueClick = function(venue) {

    // Open the infoWindow at the marker location
    infoWindow.open(map, venue.marker());

    // Fade in infowindow
    var iw_container = $(".gm-style-iw").parent();
    iw_container.stop().hide();
    iw_container.fadeIn(1500);

    // Make the clicked on venue the center of the map
    map.panTo({ lat: venue.lat(), lng: venue.lng() });
    map.setZoom(13);
    map.panBy(0, -250);

    // self.getGoogleMapsData(venue);
    self.getYelpData(venue);

    // Current venue marker bounces once when clicked
    self.setMarkerAnimation(venue);
  };

  // Sets the currenter marker to bounce once when clicked
  self.setMarkerAnimation = function(venue) {
    venue.marker().setAnimation(google.maps.Animation.BOUNCE);
    setTimeout( function() { venue.marker().setAnimation(null); }, 1400); //bounce 2x
  };


  self.filterVenues = ko.computed(function(venue) {
    self.filteredVenueList([]);
    var filter = self.filter().toLowerCase();

    $.each(self.venueList(), function(i) {
      var venueName = self.venueList()[i].name().toLowerCase();

      if (venueName.indexOf(filter) > -1) {
        self.filteredVenueList.push(self.venueList()[i]);
        // Set the map property of the marker to the map
        self.venueList()[i].marker().setMap(map);
        var myLatLng = self.venueList()[i].marker().getPosition();
        // console.log(myLatLng);
        map.panTo(myLatLng);
      } else {
        // Set the map property of the marker to null so it won't be visible
        self.venueList()[i].marker().setMap(null);
      }
    });
  }, self);


  self.getYelpData = function(venue) {

    // Use the GET method for the request
    var httpMethod = 'GET';

    // Yelp API search request url
    var yelpSearchURL = 'https://api.yelp.com/v2/search/';

    // Nonce generator
    function nonce_generate() {
      return (Math.floor(Math.random() * 1e12).toString());
    }

    // Declare Yelp Credentials
    var YELP_KEY = 'Ff-UjdYVgCfiI2lXXqK6ZA',
        YELP_KEY_SECRET = 'ayaZ2gPDYwTORpJ3EgnlnI8sEGc',
        YELP_TOKEN = 'iT9LEQqPxqNuvL8cFVyTSSAlYFJer9Jd',
        YELP_TOKEN_SECRET = 'Hro-TZlsX2NHIe7SWC0f2n5HquE';

    // Set required parameters for authentication & search
    // Using the oauth-signature package installed with bower per https://github.com/bettiolo/oauth-signature-js
    var parameters = {
      oauth_consumer_key: YELP_KEY,
      oauth_token: YELP_TOKEN,
      oauth_nonce: nonce_generate(),
      oauth_timestamp: Math.floor(Date.now()/1000),
      oauth_signature_method: 'HMAC-SHA1',
      oauth_version: '1.0',
      callback: 'cb',
      term: venue.name(), // Search term (e.g. "food", "restaurants"). If term isn’t included we search everything. The term keyword also accepts business names such as "Starbucks" - https://www.yelp.com/developers/documentation/v2/search_api
      location: 'Brooklyn, NY' // Search within Brooklyn, NY
    };

    // generates a RFC 3986 encoded, BASE64 encoded HMAC-SHA1 hash
    var signature = oauthSignature.generate(httpMethod, yelpSearchURL, parameters, YELP_KEY_SECRET, YELP_TOKEN_SECRET);

    // Add signature to list of parameters
    parameters.oauth_signature = signature;

    // Set up the ajax settings
    var ajaxSettings = {
      url: yelpSearchURL,
      data: parameters,
      cache: true,
      dataType: 'jsonp',
      success: function(response, status) {

        console.log('YELP Search API Request: ' + status );

        var yelpBusinessVenue = response.businesses[0];

        var yelpContent = '<div class="infoWindow-styling">' +
                            '<div class="venue-header" id="venue-name">' + venue.name() + '</div>' +
                            '<div class="content-left">' +
                              '<img class="yelp-thumb-image" id="yelp-image" src="' + yelpBusinessVenue.image_url + '">' +
                            '</div>' +
                            '<div class="content-right">' +
                              '<p>' +
                                '<span class="yelp-rating-image"><img id="yelp-rating" src="' + yelpBusinessVenue.rating_img_url + '"></span>' +
                                '<span class="yelp-rating-count" id="yelp-rating-count">' + yelpBusinessVenue.review_count + '</span>' +
                              '</p>' +
                              '<div class="cta-url">' +
                                '<span><a class="yelp-website" id="yelp-url" target="_blank" href="' + yelpBusinessVenue.url + '">YELP</a></span> ' +
                                // '<span><a class="business-website" id="business-website" target="_blank">WEBSITE</a></span> ' +
                              '</div>' +
                              '<p class="venue-neighborhood" id="venue-neighborhood">Hood? ' + venue.neighborhood() + '</p>' +
                              '<p class="venue-address" id="venue-address">' + venue.address() + '</p>' +
                            '</div>' +
                            '<div class="content-fill">' +
                              '<p class="yelp-about" id="yelp-about-snippet">' + yelpBusinessVenue.snippet_text + '</p>' +
                              // '<div class="w3-content w3-display-container">' +
                              //   '<div class="image-gallery" id="image-gallery">' +
                              //     galleryControls + '</div>' +
                              // '</div>' +
                            '</div>' +
                          '</div>';

        infoWindow.setContent(yelpContent);
      },
      error: function() {
        // InfoWindow Error Handling
        console.log('YELP Search API Error Status: ' + status );
        infoWindow.setContent('<div class="infoWindow-styling">' +
                                '<p>Error, could not load content</p>' +
                              '</div>');
      }
    };

    // Send off the ajax request to Yelp
    $.ajax(ajaxSettings);
  };

  // Add the listener for loading the page
  google.maps.event.addDomListener(window, 'load', function() {
    self.buildVenueLocations();
    self.setVenueClickFunctions();
    self.filteredVenueList(self.venueList());
  });

  // Responsive Google Maps: Re-center google maps to browser size changes
  google.maps.event.addDomListener(window, 'resize', function() {
    var center = map.getCenter();
    google.maps.event.trigger(map, 'resize');
    map.setCenter(center);
  });

  // Custom infowindow styling
  // http://en.marnoto.com/2014/09/5-formas-de-personalizar-infowindow.html
  google.maps.event.addDomListener(infoWindow, 'domready', function() {
    // Reference to the DIV which receives the contents of the infowindow using jQuery
    var iwOuter = $('.gm-style-iw');
    var iwBackground = iwOuter.prev();
    // Remove the background shadow DIV
    iwBackground.children(':nth-child(2)').css({'display' : 'none'});
    // Remove the white background DIV
    iwBackground.children(':nth-child(4)').css({'display' : 'none'});
    iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': '#333333 0px 1px 6px', 'z-index' : '0', 'background-color' : '#333333'});
    // Target the close button
    var iwCloseBtn = iwOuter.next();
    // Apply the desired effect to the close button
    iwCloseBtn.css({
      'opacity': '1', // by default the close button has an opacity of 0.7
      'width': '19px',
      'height': '19px',
      'right': '30px',
      'top': '17px',
      'border': '3px solid #333333', // increasing button border and new color
      'border-radius': '5px', // circular effect
      'background-color' : '#333333',
      'color' : 'white'
      });
    // The API automatically applies 0.7 opacity to the button after the mouseout event.
    // This function reverses this event to the desired value.
    iwCloseBtn.toggleClass( function() {
      $(this).css({
        'opacity': '1',
        'background-color' : 'white'
      });
    });
  });
};

// Venue constructor to create venues & markers from the model
var Venue = function(data) {
  var self = this;

  // Set all the properties as knockout observables
  var marker;
  self.name = ko.observable(data.name);
  self.lat = ko.observable(data.lat);
  self.lng = ko.observable(data.lng);
  self.address = ko.observable(data.address);
  self.neighborhood = ko.observable(data.neighborhood);
  self.pid = ko.observable(data.pid);

// makeMarkerIcon function is referenced from the Udacity google maps course.
  // This function takes in a COLOR, and then creates a new marker
  // icon of that color. The icon will be 21 px wide by 34 high, have an origin
  // of 0, 0 and be anchored at 10, 34).
  function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
      'https://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
      '|40|_|%E2%80%A2',
      new google.maps.Size(21, 34),
      new google.maps.Point(0, 0),
      new google.maps.Point(10, 34),
      new google.maps.Size(21,34));
    return markerImage;
  }

  var defaultIcon = makeMarkerIcon('44a2a1');
  var highlightedIcon = makeMarkerIcon('00BCD4');

  // Google Maps Marker for self location
  marker = new google.maps.Marker({
    position: new google.maps.LatLng(self.lat(), self.lng()),
    map: map,
    title: self.name(),
    icon: defaultIcon,
    animation: google.maps.Animation.DROP
  });

  // Two event listeners for color change from mousing over & out on the marker
  marker.addListener('mouseover', function() {
    this.setIcon(highlightedIcon);
  });
  marker.addListener('mouseout', function() {
    this.setIcon(defaultIcon);
  });
  // Set the marker as a knockout observable
  self.marker = ko.observable(marker);
};

//Fade in effect
ko.bindingHandlers.fadein = {
  init: function(element, valueAccessor) {
    var value = valueAccessor();
    $(element).toggle(ko.unwrap(value));
  },
  update: function(element, valueAccessor) {
    var value = valueAccessor();

    if (ko.unwrap(value)) {
      $(element).fadeIn();
    } else {
      $(element).fadeOut();
    }
  }
};

