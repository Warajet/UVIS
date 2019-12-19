// Key required to create map
var api_url = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}'
var mapbox_attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
var my_access_token = 'pk.eyJ1Ijoid2FyYWtvcm5qZXQiLCJhIjoiY2syajc5aGdyMTJkMzNrcGNhZmNvazl4byJ9.VPwVxiXRD22W1xMhzwSw7g'

// Using Leaflet
// var mymap = L.map('mapid',
//  {
// 	 center: [13.7563, 100.5018],
// 	zoom: 13
// ,layers: streets});

var satellite = L.tileLayer(api_url, {
	attribution: mapbox_attribution,
	maxZoom: 18,
	id: 'mapbox.satellite',
	accessToken: my_access_token
});

var streets   = L.tileLayer(api_url, {
	attribution: mapbox_attribution,
	maxZoom: 18,
	id: 'mapbox.streets',
	accessToken: my_access_token
});


var traffic   = L.tileLayer(api_url, {
	attribution: mapbox_attribution,
	maxZoom: 18,
	id: 'mapbox.mapbox-traffic-v1',
	type:"vector",
	accessToken: my_access_token
});
//traffic.setOpacity(0.5);

// Placing icons here
var rainfallIcon = L.icon({
    iconUrl: 'images/rainfall_marker.png',

    iconSize:     [50, 50], // size of the icon
    iconAnchor:   [50, 50], // point of the icon which will correspond to marker's location
    popupAnchor:  [20, -30] // point from which the popup should open relative to the iconAnchor
});

var temperatureIcon = L.icon({
    iconUrl: 'images/temperature.png',

    iconSize:     [50, 50], // size of the icon
    iconAnchor:   [50, 50], // point of the icon which will correspond to marker's location
    popupAnchor:  [20, -30] // point from which the popup should open relative to the iconAnchor
});

var windIcon = L.icon({
    iconUrl: 'images/wind.png',

    iconSize:     [50, 50], // size of the icon
    iconAnchor:   [50, 50], // point of the icon which will correspond to marker's location
    popupAnchor:  [20, -30] // point from which the popup should open relative to the iconAnchor
});


var baseMaps = {
	"Satellite": satellite,
	"Streets": streets,
};

var customMap={
	"Traffic": traffic
}

L.mapbox.accessToken = my_access_token
var mymap = L.mapbox.map('mapid').setView( [13.7291448, 100.7755224] , 10)
.addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));

// Adding layer controls
L.EditControl = L.Control.extend({
  options: {
    position: 'topright',
    callback: null,
    kind: '',
    html: ''
  },

  onAdd: function(map) {
    var container = L.DomUtil.create('div', 'leaflet-control leaflet-bar'),
      link = L.DomUtil.create('a', '', container);

    link.href = '#';
    link.title = 'Create a new ' + this.options.kind;
    link.innerHTML = this.options.html;
    L.DomEvent.on(link, 'click', L.DomEvent.stop)
      .on(link, 'click', function() {
        window.LAYER = this.options.callback.call(map.editTools);
      }, this);

    return container;
  }
});

// Adding control temperature layer
L.temperatureControl = L.EditControl.extend(
	{
		onAdd: function(map) {
    var el = L.DomUtil.create('div', 'leaflet-bar temperature-control');

    el.innerHTML = '<img src= "images/temperature.png" width=\"24px\" height=\"24px\">';

    return el;
  },

  onRemove: function(map) {
    // Nothing to do here
		 L.DomEvent.off('div', )
  }
	}
);

// L.temperatureControl = function(opts) {
//   return new L.Control.temperatureControl(opts);
// }
//
// L.temperatureControl({
//   position: 'topright'
// }).addTo(mymap);



// Adding control wind layer
L.windControl = L.EditControl.extend(
	{
		onAdd: function(map) {
    var el = L.DomUtil.create('div', 'leaflet-bar wind-control');

    el.innerHTML = '<img src= "images/wind.png"  width=\"24px\" height=\"24px\">';

    return el;
  },

  onRemove: function(map) {
    // Nothing to do here
  }
	}
);

// Adding control rainfall layer
L.rainfallControl = L.EditControl.extend(
	{
		onAdd: function(map) {
    var el = L.DomUtil.create('div', 'leaflet-bar rainfall-control');

    el.innerHTML = '<img src= "images/rainfall.png" width=\"24px\" height=\"24px\">';

    return el;
  },
    onRemove: function(map) {
      // Nothing to do here
    }
	}
);


// Adding control traffic layer
L.trafficControl =  L.EditControl.extend(
	{
		onAdd: function(map) {
    var el = L.DomUtil.create('div', 'leaflet-bar traffic-control');

    el.innerHTML ='<img src="images/traffic.png" width=\"24px\" height=\"24px\">';

    return el;
  },

  onRemove: function(map) {
    // Nothing to do here
  	}
	}
);

mymap.addControl(new L.temperatureControl());
mymap.addControl(new L.windControl());
mymap.addControl(new L.rainfallControl());
mymap.addControl(new L.trafficControl());


// L.Control.Attribution.prototype.options.position = "bottomleft";
//
// var layers = {
// 		Streets: L.mapbox.tileLayer('mapbox.streets'),
// 		Outdoors: L.mapbox.tileLayer('mapbox.outdoors'),
// 		Satellite: L.mapbox.tileLayer('mapbox.satellite')
// };
// layers.Streets.addTo(mymap);


var nodesInfo = []
var weatherData = []
var selectedNode = 0
var array_marker = []


function getAQIInfo()
{
	console.log("AQI info is called");
	$.getJSON("https://lapsscentral.azurewebsites.net/api/sensors", function(data){
		weatherData = data
		weatherData.forEach(function (e) {
						//console.log( e.name + "\n PM 2.5 val: " + e.pm25Level +"\n PM 1.0 val: " + e.pm10Level+
					//"\n Temp: " + e.temp + "\n Humidity:" + e.humidity );
		});
		createClusterMarkers();
	});
}

function getNodeInfo() {
		console.log("nodesInfo is called");
    // Get data from server and store in 'array_marker'
    $.getJSON("https://lapsscentral.azurewebsites.net/api/nodeinfos", function (data) {
        nodesInfo = data
				nodesInfo.forEach(function(e)
				{
					console.log("Lat: " + e.latitude + " Lon: " + e.longitude );
				});
				getAQIInfo();
    });
}

function createClusterMarkers(){
		// Create the markerClusterGroup here
		var markers = L.markerClusterGroup();
		for(var i = 0; i < nodesInfo.length; i++)
		{
			var node_point = nodesInfo[i];
			var title = node_point.name
			console.log(node_point.name+ " "+node_point.latitude + " "+ node_point.longitude);
			var marker =  L.marker(new L.LatLng(node_point.latitude, node_point.longitude),{
				icon: rainfallIcon,
				title:title
			});

			for(var j = 0; j < weatherData.length;j++)
			{
				var weather_sensor = weatherData[j];
				if(weather_sensor.name== node_point.name)
				{
					console.log(weather_sensor.name +
							"\n PM 2.5 val: " + weather_sensor.pm25Level
							+ "\n PM 1.0 val: " + weather_sensor.pm10Level+
							"\n Temp: " + weather_sensor.temp +
							 "\n Humidity:" + weather_sensor.humidity);

					// You can add custom html here
					marker.bindPopup( weather_sensor.name +
							"<br> PM 2.5: " + weather_sensor.pm25Level + " ug/cm³" +
							"<br> Temp: " + weather_sensor.temp + "°C" +
							"<br> Humidity:" + weather_sensor.humidity + "% RH <br>" ,  {
						maxWidth: "400"
					});
				}
				else{
					marker.bindPopup("KLASS: " + title,  {
					  maxWidth: "auto"
					});
				}
			}
			markers.addLayer(marker);
		}
		mymap.addLayer(markers);
}


tmdWeatherData = []
function getTMDAQIInfo()
{
  console.log("AQI info is called");
	$.getJSON("http://data.tmd.go.th/api/thailandMonthlyRainfall/v1/?uid=api&ukey=api12345&format=json&year=2019"
  , function(data){
		tmdWeatherData = data
		tmdWeatherData.forEach(function (e) {
						console.log( e.StationMonthlyRainfall.StationNameEnglish
              + "\n Lat: " + e.StationMonthlyRainfall.Latitude
            +"\n Long: " + e.StationMonthlyRainfall.Longitude
            +"\n Rainfall: " + e.StationMonthlyRainfall.MonthlyRainfall.RainfallTOTAL);
					//"\n Temp: " + e.temp + "\n Humidity:" + e.humidity );
		});
		//createClusterMarkers();
	});
}

getNodeInfo();
getTMDAQIInfo();


var mcg = L.markerClusterGroup({
      maxClusterRadius: 50,
      iconCreateFunction: function (cluster) {
          var val = 0,
              childMarkers = cluster
              .getAllChildMarkers(),
              total = childMarkers.length;

          for (i = 0; i < total; i++) {
              val = val + parseFloat(childMarkers[i].options.title);
          }
          var avg = val / total;
          avg = Math.round(avg * 10) / 10;

          return new L.divIcon({
              html: '<div><span style="line-height: 30px;">' + avg + '</span></div>',
              className: clusterColor(avg)
          })
    }
});

//
// L.control.layers(baseMaps, customMap).addTo(mymap);

var marker = L.marker([51.5, -0.09]).addTo(mymap);

var circle = L.circle([51.508, -0.11], {
	color: 'red',
	fillColor: '#f03',
	fillOpacity: 0.5,
	radius: 500
}).addTo(mymap);

var polygon = L.polygon([
	[51.509, -0.08],
	[51.503, -0.06],
	[51.51, -0.047]
]).addTo(mymap);

// Pop up text at clicking event
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");

var popup = L.popup()
	.setLatLng([51.5, -0.09])
	.setContent("I am a standalone popup.")
	.openOn(mymap);

function onMapClick(e) {
	   alert("You clicked the map at " + e.latlng);
}

// mymap.on('click', onMapClick);

var popup = L.popup();

function onMapClick(e) {
	popup
		.setLatLng(e.latlng)
		.setContent("You clicked the map at " + e.latlng.toString())
		.openOn(mymap);
}

// mymap.on('click', onMapClick);

//Stack geoJSON layer on top of the map
var geojsonFeature = {"type":"Feature","properties":{"prov_code":"11","title":"à¸ªà¸¡à¸¸à¸—à¸£à¸›à¸£à¸²à¸à¸²à¸£"},"geometry":{"type":"Polygon","coordinates":[[[100.856,13.7],[100.955,13.663],[100.963,13.642],[100.907,13.592],[100.915,13.571],[100.905,13.555],[100.89,13.565],[100.872,13.49],[100.848,13.478],[100.693,13.505],[100.591,13.543],[100.561,13.507],[100.458,13.487],[100.452,13.602],[100.496,13.588],[100.521,13.605],[100.517,13.673],[100.546,13.671],[100.553,13.705],[100.585,13.696],[100.579,13.668],[100.648,13.652],[100.661,13.672],[100.693,13.651],[100.71,13.718],[100.856,13.7]]]}}

var myLayer = L.geoJSON().addTo(mymap);
myLayer.addData(geojsonFeature);
