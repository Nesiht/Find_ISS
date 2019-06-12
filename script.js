let map;
let googleMapStyles = [
   {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
   {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
   {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
   {
     featureType: 'administrative.locality',
     elementType: 'labels.text.fill',
     stylers: [{color: '#d59563'}]
   },
   {
     featureType: 'poi',
     elementType: 'labels.text.fill',
     stylers: [{color: '#d59563'}]
   },
   {
     featureType: 'poi.park',
     elementType: 'geometry',
     stylers: [{color: '#263c3f'}]
   },
   {
     featureType: 'poi.park',
     elementType: 'labels.text.fill',
     stylers: [{color: '#6b9a76'}]
   },
   {
     featureType: 'road',
     elementType: 'geometry',
     stylers: [{color: '#38414e'}]
   },
   {
     featureType: 'road',
     elementType: 'geometry.stroke',
     stylers: [{color: '#212a37'}]
   },
   {
     featureType: 'road',
     elementType: 'labels.text.fill',
     stylers: [{color: '#9ca5b3'}]
   },
   {
     featureType: 'road.highway',
     elementType: 'geometry',
     stylers: [{color: '#746855'}]
   },
   {
     featureType: 'road.highway',
     elementType: 'geometry.stroke',
     stylers: [{color: '#1f2835'}]
   },
   {
     featureType: 'road.highway',
     elementType: 'labels.text.fill',
     stylers: [{color: '#f3d19c'}]
   },
   {
     featureType: 'transit',
     elementType: 'geometry',
     stylers: [{color: '#2f3948'}]
   },
   {
     featureType: 'transit.station',
     elementType: 'labels.text.fill',
     stylers: [{color: '#d59563'}]
   },
   {
     featureType: 'water',
     elementType: 'geometry',
     stylers: [{color: '#17263c'}]
   },
   {
     featureType: 'water',
     elementType: 'labels.text.fill',
     stylers: [{color: '#515c6d'}]
   },
   {
     featureType: 'water',
     elementType: 'labels.text.stroke',
     stylers: [{color: '#17263c'}]
   }
];
let googleMapStylesLight = [];
let lightDarkMode;
let controll = true;

// Store the switch in a variable.
const toggleSwitch = document.querySelector('.switch input[type="checkbox"]');

// Initiat Google Map.
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 59.3251172, lng: 18.0710935},
    zoom: 8,
    styles: lightDarkMode = controll == true ? googleMapStyles: googleMapStylesLight // Ternary Operator to chech if let controll is true or not, then apply the correct style.
  });
}

// Manually fetch and show the position using the button.
document.getElementById('getCoordinates').addEventListener('click', getCoordinates);

// Function to fetch and show the position of the ISS on map.
function getCoordinates(){
    fetch('https://api.wheretheiss.at/v1/satellites/25544')
    .then(function(response){
        return response.json();
    })
    .then(function(myData){
        // Store lat and lon respone in the variable.
        let myLatLong = {lat: myData.latitude, lng: myData.longitude};
        // Update map with new lat and lon.
        map = new google.maps.Map(document.getElementById('map'), {
          center: myLatLong,
          zoom: 4,
          styles: lightDarkMode = controll == true ? googleMapStyles: googleMapStylesLight // Ternary Operator to chech if let controll is true or not, then apply the correct style.
        });
        // Using a marker to plot the lat and lon for the ISS.
        var marker = new google.maps.Marker({
          position: myLatLong,
          map: map,
          title: 'ISS IS HERE!'
        });
    })
    .catch(function(error){
        console.log('Something is wrong: \n', error);
    })
}

// Change attribute in the css, from dark to light theme.
function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'light');
        controll = false;
    }
    else {
        document.documentElement.setAttribute('data-theme', 'dark');
        controll = true;
    }
}

// Reset Google Map and change from dark to light theme.
function switchMap(e) {
    if (e.target.checked) {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 59.3251172, lng: 18.0710935},
          zoom: 8,
          styles: googleMapStylesLight
        });
    }
    else {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 59.3251172, lng: 18.0710935},
          zoom: 8,
          styles: googleMapStyles
        });
    }
}

// Run function when switch is toggled.
toggleSwitch.addEventListener('change', switchTheme, false);
toggleSwitch.addEventListener('change', switchMap, false);


setInterval(getCoordinates, 10000); // Run the fetch api request and plot the lat and lon automaticly every x millisecond.


// Function to fetch and show the position of the ISS on map.
// function getCoordinates(){
//     fetch('https://api.wheretheiss.at/v1/satellites/25544')
//     .then(function(response){
//         return response.json();
//     })
//     .then(function(myData){
//         // Store lat and lon respone in the variable.
//         let myLatLong = {lat: myData.latitude, lng: myData.longitude};
//         console.log(myLatLong);
//         // Update map with new lat and lon when button is pushed.
//         map = new google.maps.Map(document.getElementById('map'), {
//           center: myLatLong,
//           zoom: 4,
//           styles: googleMapStyles // Variable, kan man sätta en function här som kollar huruvida checkboxen är true eller false?
//         });
//
//         // Using a marker to plot the lat and lon for the ISS.
//         var marker = new google.maps.Marker({
//           position: myLatLong,
//           map: map,
//           title: 'ISS IS HERE!'
//         });
//     })
//     .catch(function(error){
//         console.log('Something is wrong: \n', error);
//     })
// }
