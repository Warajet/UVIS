// DO NOT USE THIS FILE
// USE script2.js instead

var rainfallMonth1;
var rainfallMonth2;
var rainfallMonth3;
var rainfallMonth4;
var rainfallMonth5;
var rainfallMonth6;
var rainfallMonth7;
var rainfallMonth8;
var rainfallMonth9;
var rainfallMonth10;
var rainfallMonth11;
var rainfallMonth12;

$.getJSON("https://data.tmd.go.th/api/thailandMonthlyRainfall/v1/?uid=u62thewegang&ukey=350fd547960c4035f5c43c1bdf7e9730&format=json&year=2019", function(data) {
  console.log(data.StationMonthlyRainfall[83])

  snt = data.StationMonthlyRainfall[83].StationNameThai
  sne = data.StationMonthlyRainfall[83].StationNameEnglish
  lat = data.StationMonthlyRainfall[83].Latitude
  lon = data.StationMonthlyRainfall[83].Longitude
  mrf = data.StationMonthlyRainfall[83].MonthlyRainfall.RainfallTOTAL
  rainfallMonth1 = data.StationMonthlyRainfall[83].MonthlyRainfall.RainfallJAN
  rainfallMonth2 = data.StationMonthlyRainfall[83].MonthlyRainfall.RainfallFEB
  rainfallMonth3 = data.StationMonthlyRainfall[83].MonthlyRainfall.RainfallMAR
  rainfallMonth4 = data.StationMonthlyRainfall[83].MonthlyRainfall.RainfallAPR
  rainfallMonth5 = data.StationMonthlyRainfall[83].MonthlyRainfall.RainfallMAY
  rainfallMonth6 = data.StationMonthlyRainfall[83].MonthlyRainfall.RainfallJUN
  rainfallMonth7 = data.StationMonthlyRainfall[83].MonthlyRainfall.RainfallJUL
  rainfallMonth8 = data.StationMonthlyRainfall[83].MonthlyRainfall.RainfallAUG
  rainfallMonth9 = data.StationMonthlyRainfall[83].MonthlyRainfall.RainfallSEP
  rainfallMonth10 = data.StationMonthlyRainfall[83].MonthlyRainfall.RainfallOCT
  rainfallMonth11 = data.StationMonthlyRainfall[83].MonthlyRainfall.RainfallNOV
  rainfallMonth12 = data.StationMonthlyRainfall[83].MonthlyRainfall.RainfallDEC

  $(".StationNameThai").append(snt);
  $(".StationNameEnglish").append(sne);
  $(".Latitude").append(lat);
  $(".Longitude").append(lon);
  $(".MonthlyRainfall").append(mrf);
});

// Chart
var ctx = document.getElementById('Chart_pariman_namfon').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","7"],
        datasets: [{
            label: 'ปริมาณน้ำฝน',
            fill: false,
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45]
        },{
            label: 'ปริมาณน้ำฝนในกรุงเทพฯ',
            fill: false,
            borderColor: 'rgb(12, 99, 132)',
            data: [rainfallMonth1, rainfallMonth2, rainfallMonth3, rainfallMonth4, rainfallMonth5, rainfallMonth6, rainfallMonth7]
        }]
    },

    // Configuration options go here
    options: {
        responsive: true,
    }
});