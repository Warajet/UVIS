// Key required to create map
var api_url = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}'
var mapbox_attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
var my_access_token = 'pk.eyJ1Ijoid2FyYWtvcm5qZXQiLCJhIjoiY2syajc5aGdyMTJkMzNrcGNhZmNvazl4byJ9.VPwVxiXRD22W1xMhzwSw7g'

// var satellite = L.tileLayer(api_url, {
// 	attribution: mapbox_attribution,
// 	maxZoom: 18,
// 	id: 'mapbox.satellite',
// 	accessToken: my_access_token
// });
// var streets   = L.tileLayer(api_url, {
// 	attribution: mapbox_attribution,
// 	maxZoom: 18,
// 	id: 'mapbox.streets',
// 	accessToken: my_access_token
// });
//
// var traffic   = L.tileLayer(api_url, {
// 	attribution: mapbox_attribution,
// 	maxZoom: 18,
// 	id: 'mapbox.mapbox-traffic-v1',
// 	type:"vector",
// 	accessToken: my_access_token
// });
//
// traffic.setOpacity(0.5);
//
// console.log(traffic)
//
//
// var mymap = L.map('mapid',
//  {center: [51.505, -0.09],
// 	zoom: 13
// ,layers: streets});
//
// var baseMaps = {
// 	"Satellite": satellite,
// 	"Streets": streets,
// };
//
// var customMap={
// 	"Traffic": traffic
// }

mapboxgl.accessToken = 'pk.eyJ1Ijoid2FyYWtvcm5qZXQiLCJhIjoiY2syajc5aGdyMTJkMzNrcGNhZmNvazl4byJ9.VPwVxiXRD22W1xMhzwSw7g';
var map = new mapboxgl.Map({
	container: 'mapid',
	style: 'mapbox://styles/mapbox/streets-v9'
});

map.addControl(new mapboxgl.NavigationControl());
map.addControl(new MapboxTraffic());
// var gl = L.mapboxGL({
//     accessToken: my_access_token,
//     style: 'mapbox://styles/mapbox/streets-v9'
// }).addTo(mymap);


// L.control.layers(baseMaps, customMap).addTo(mymap);
//
//
// var marker = L.marker([51.5, -0.09]).addTo(mymap);
//
// var circle = L.circle([51.508, -0.11], {
// 	color: 'red',
// 	fillColor: '#f03',
// 	fillOpacity: 0.5,
// 	radius: 500
// }).addTo(mymap);
//
// var polygon = L.polygon([
// 	[51.509, -0.08],
// 	[51.503, -0.06],
// 	[51.51, -0.047]
// ]).addTo(mymap);
//
// // Pop up text at clicking event
// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
// circle.bindPopup("I am a circle.");
// polygon.bindPopup("I am a polygon.");
//
// var popup = L.popup()
// 	.setLatLng([51.5, -0.09])
// 	.setContent("I am a standalone popup.")
// 	.openOn(mymap);
//
//   function onMapClick(e) {
// 	alert("You clicked the map at " + e.latlng);
// }
//
// mymap.on('click', onMapClick);
//
// var popup = L.popup();
//
// function onMapClick(e) {
// 	popup
// 		.setLatLng(e.latlng)
// 		.setContent("You clicked the map at " + e.latlng.toString())
// 		.openOn(mymap);
// }
//
// mymap.on('click', onMapClick);
//
// //Stack geoJSON layer on top of the map
// var geojsonFeature = {"type":"Feature","properties":{"prov_code":"11","title":"à¸ªà¸¡à¸¸à¸—à¸£à¸›à¸£à¸²à¸à¸²à¸£"},"geometry":{"type":"Polygon","coordinates":[[[100.856,13.7],[100.955,13.663],[100.963,13.642],[100.907,13.592],[100.915,13.571],[100.905,13.555],[100.89,13.565],[100.872,13.49],[100.848,13.478],[100.693,13.505],[100.591,13.543],[100.561,13.507],[100.458,13.487],[100.452,13.602],[100.496,13.588],[100.521,13.605],[100.517,13.673],[100.546,13.671],[100.553,13.705],[100.585,13.696],[100.579,13.668],[100.648,13.652],[100.661,13.672],[100.693,13.651],[100.71,13.718],[100.856,13.7]]]}}
//
// var myLayer = L.geoJSON().addTo(mymap);
// myLayer.addData(geojsonFeature);
