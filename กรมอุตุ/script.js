$.getJSON("http://data.tmd.go.th/api/thailandMonthlyRainfall/v1/?uid=api&ukey=api12345&format=json&year=2019", function(data) {
  console.log(data.StationMonthlyRainfall[83])

  snt = data.StationMonthlyRainfall[83].StationNameThai
  sne = data.StationMonthlyRainfall[83].StationNameEnglish
  lat = data.StationMonthlyRainfall[83].Latitude
  lon = data.StationMonthlyRainfall[83].Longitude
  mrf = data.StationMonthlyRainfall[83].MonthlyRainfall.RainfallTOTAL

  $(".StationNameThai").append(snt);
  $(".StationNameEnglish").append(sne);
  $(".Latitude").append(lat);
  $(".Longitude").append(lon);
  $(".MonthlyRainfall").append(mrf);
});