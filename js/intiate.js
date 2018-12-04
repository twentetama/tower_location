var map;
var newLoc;
var newMarker;

function initMap() {
  var indonesia = {lat: -2.5489, lng: 118.0149};
  var towLoc = [
    {
      name: "candidate 1",
      center: {lat: 2.870178, lng: 117.618293},
      info:
      '<h2>' + "Candidate 1" + '</h2>' +
      '<br/>' +
      '<ul>' +
        '<li>'+ "Lokasi: Masjid" + '</li>' +
        '<li>'+ 'Jarak ke Tower terdekat: 4 km' + '</li>' +
        '<li>'+ 'Jarak ke Jalan Utama: 500 m' + '</li>' +
        '<li>'+ 'Lingkungan sekitar: perumahan' + '</li>' +
      '</ul>'
    },
    {
      name: "candidate 2",
      center: {lat: 2.753109, lng: 117.677390},
      info:
      '<h2>' + "Candidate 2" + '</h2>' +
      '<br/>' +
      '<ul>' +
        '<li>'+ "Lokasi: Sekolah" + '</li>' +
        '<li>'+ 'Jarak ke Tower terdekat: 10 km' + '</li>' +
        '<li>'+ 'Jarak ke Jalan Utama: 500 m' + '</li>' +
        '<li>'+ 'Lingkungan sekitar: ladang' + '</li>' +
      '</ul>'
    },
    {
      name: "candidate 3",
      center: {lat: 2.781985, lng: 117.466766},
      info:
      '<h2>' + "Candidate 3" + '</h2>' +
      '<br/>' +
      '<ul>' +
        '<li>'+ "Lokasi: Masjid" + '</li>' +
        '<li>'+ 'Jarak ke Tower terdekat: 4 km' + '</li>' +
        '<li>'+ 'Jarak ke Jalan Utama: 500 m' + '</li>' +
        '<li>'+ 'Lingkungan sekitar: persawahan' + '</li>' +
      '</ul>'
    },
    {
      name: "candidate 4",
      center: {lat: 2.811126, lng: 117.409509},
      info:
      '<h2>' + "Candidate 4" + '</h2>' +
      '<br/>' +
      '<ul>' +
        '<li>'+ "Lokasi: Apotek" + '</li>' +
        '<li>'+ 'Jarak ke Tower terdekat: 1 km' + '</li>' +
        '<li>'+ 'Jarak ke Jalan Utama: 1 m' + '</li>' +
        '<li>'+ 'Lingkungan sekitar: perumahan' + '</li>' +
      '</ul>'
    }]

  var circles = [];
  var markers = [];

  // The map, centered at Indonesia
  map = new google.maps.Map(
    document.getElementById('map'), {zoom: 5, center: indonesia});

  //new location
  for (var i = 0; i < towLoc.length; i++) {
    addMarker(towLoc[i]);
  };

  function addMarker(props){
    var marker = new google.maps.Marker({
      map: map,
      position: props.center,
      title: 'New Location',
      icon: 'data/icon.png',
      clickable: true,
      info: props.info,
    });

    if(props.info){
      var infoWindow = new google.maps.InfoWindow({
        content: props.info
      });

      marker.addListener('click', function(){
        infoWindow.open(map,marker);
      });
    };
    markers.push(marker);
  };

  // Buffer
  for (var i = 0; i < towLoc.length; i++) {
    addBuffer(towLoc[i]);
  };

  function addBuffer(props){
    var circle = new google.maps.Circle({
      strokeColor: '#FF3333',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF3333',
      fillOpacity: 0.35,
      map: map,
      center: props.center,
      radius: 10000,
    });
    circles.push(circle)
  };

  //layer toggle existing location
  var clickState = 0;
  var btn = document.querySelector('.button-elem');
  btn.addEventListener('click', function(){
    map.data.setStyle({visible: true});
    if (clickState == 0) {
      // code snippet 1
      tower = map.data.addGeoJson(towerLoc);
      clickState = 1;
    } else {
      // code snippet 2
      map.data.setStyle({visible: false});
      clickState = 0;
    }
  });

  // Sets the new location.
  function setNewOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  };

  setNewOnAll();

  var clickState2 = 0;
  var btn = document.querySelector('.button-elem2');
  btn.addEventListener('click', function(){
    if (clickState2 == 0) {
      // code snippet 1
      setNewOnAll(map);
      clickState2 = 1;
    } else {
      // code snippet 2
      setNewOnAll(null);
      clickState2 = 0;
    }
  });

  // toggle buffer
  function setBufOnAll(map) {
    for (var i = 0; i < circles.length; i++) {
      circles[i].setMap(map);
    }
  };

  setBufOnAll(null);

  var clickState3 = 0;
  var btn = document.querySelector('.button-elem3');
  btn.addEventListener('click', function(){
    if (clickState3 == 0) {
      // code snippet 1
      setBufOnAll(map);
      clickState3 = 1;
    } else {
      // code snippet 2
      setBufOnAll(null);
      clickState3 = 0;
    }
  });
}
function getLoc() {
  var newLat = document.getElementById('lat').value;
  var newLong = document.getElementById('lng').value;
  var newLoc = new google.maps.LatLng(newLat, newLong);
  console.log(newLoc);
  addNewMarker(newLoc);
  newMarker.setMap(map)
};

function addNewMarker (location){
  newMarker = new google.maps.Marker({
    position: location,
    map: map,
    clickable: true,
  });

  if(location){
    var infoWindow = new google.maps.InfoWindow({
      content: "new location"
    });

  newMarker.addListener('click', function(){
      infoWindow.open(map,newMarker);
    });
  };
};
