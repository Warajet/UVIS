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

getNodeInfo();

// function getTMDAPIinfo()
// {
// 	console.log("Get data from TMD API");
// 	$.getJSON("http://data.tmd.go.th/api/WeatherToday/V1/?type=json", function(data)
// 	{
// 		weather_data = JSON.parse(data)
// 		weather_data.forEach(function (e)
// 		{
// 			console.log("Lat: " + e.Stations + " Lon: " + e.Stations);
// 		});
// 		//createTMDMarkers()
// 	});
// }
// getTMDAPIinfo()

// function createTMDMarkers()
// {
// 	var markers = L.markerClusterGroup();
// 	for(var i  = 0; i < weather_data.length; i++)
// 	{
// 		// Add the data to weather_data
// 	}
// }

//Import the data addressPoints from some external data
// From: https://www.mapbox.com/mapbox.js/assets/data/realworld.388.js
// for (var i = 0; i < addressPoints.length; i++) {
//     var a = addressPoints[i];
//     var title = a[2];
//     var marker = L.marker(new L.LatLng(a[0], a[1]), {
// 			title: title });
//     marker.bindPopup(title);
//     markers.addLayer(marker);
// }

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

mymap.on('click', onMapClick);

var popup = L.popup();

function onMapClick(e) {
	popup
		.setLatLng(e.latlng)
		.setContent("You clicked the map at " + e.latlng.toString())
		.openOn(mymap);
}

mymap.on('click', onMapClick);

//Stack geoJSON layer on top of the map
var geojsonFeature = {"type":"Feature","properties":{"prov_code":"11","title":"à¸ªà¸¡à¸¸à¸—à¸£à¸›à¸£à¸²à¸à¸²à¸£"},"geometry":{"type":"Polygon","coordinates":[[[100.856,13.7],[100.955,13.663],[100.963,13.642],[100.907,13.592],[100.915,13.571],[100.905,13.555],[100.89,13.565],[100.872,13.49],[100.848,13.478],[100.693,13.505],[100.591,13.543],[100.561,13.507],[100.458,13.487],[100.452,13.602],[100.496,13.588],[100.521,13.605],[100.517,13.673],[100.546,13.671],[100.553,13.705],[100.585,13.696],[100.579,13.668],[100.648,13.652],[100.661,13.672],[100.693,13.651],[100.71,13.718],[100.856,13.7]]]}}

var myLayer = L.geoJSON().addTo(mymap);
myLayer.addData(geojsonFeature);
