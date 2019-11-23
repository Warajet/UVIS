'use strict';
var endpoint = 'https://data.tmd.go.th/api/thailandMonthlyRainfall/v1/?uid=u62thewegang&ukey=350fd547960c4035f5c43c1bdf7e9730&format=json&year=2019'

function setChart(data){
    console.log("Script2!!!");

    var rainfall_stationNameEnglish = data.StationMonthlyRainfall[83].StationNameEnglish
    var rainfall_m1 = data.StationMonthlyRainfall[83].MonthlyRainfall.RainfallJAN;
    var rainfall_m2 = data.StationMonthlyRainfall[83].MonthlyRainfall.RainfallFEB;
    var rainfall_m3 = data.StationMonthlyRainfall[83].MonthlyRainfall.RainfallMAR;
    var rainfall_m4 = data.StationMonthlyRainfall[83].MonthlyRainfall.RainfallAPR
    var rainfall_m5 = data.StationMonthlyRainfall[83].MonthlyRainfall.RainfallMAY
    var rainfall_m6 = data.StationMonthlyRainfall[83].MonthlyRainfall.RainfallJUN
    var rainfall_m7 = data.StationMonthlyRainfall[83].MonthlyRainfall.RainfallJUL
    var rainfall_m8 = data.StationMonthlyRainfall[83].MonthlyRainfall.RainfallAUG
    var rainfall_m9 = data.StationMonthlyRainfall[83].MonthlyRainfall.RainfallSEP
    var rainfall_m10 = data.StationMonthlyRainfall[83].MonthlyRainfall.RainfallOCT
    var rainfall_m11 = data.StationMonthlyRainfall[83].MonthlyRainfall.RainfallNOV
    var rainfall_m12 = data.StationMonthlyRainfall[83].MonthlyRainfall.RainfallDEC

    // ------------------------------------------------------- //
    // Chart
    // ------------------------------------------------------ //
    var $chart = $('#chartParimanNamfon');
    var ChartHome = new Chart($chart[0].getContext("2d"), {
        type: 'line',
        options: {
            responsive: true,
        },
        data: {
            labels: ['January','February','March','April','May','June','July','August','September','October','November','December'],
            datasets: [
                {
                    label: rainfall_stationNameEnglish,
                    borderColor: 'rgb(12, 99, 132)',
                    fill: true,
                    data: [rainfall_m1, rainfall_m2, rainfall_m3, rainfall_m4, rainfall_m5, rainfall_m6, rainfall_m7, rainfall_m8, rainfall_m9, rainfall_m10, rainfall_m11, rainfall_m12],
                }
            ]
        }
    })
}

function insertDataToHomepage(data){
    var snt = data.StationMonthlyRainfall[83].StationNameThai
    var sne = data.StationMonthlyRainfall[83].StationNameEnglish
    var lat = data.StationMonthlyRainfall[83].Latitude
    var lon = data.StationMonthlyRainfall[83].Longitude
    var mrf = data.StationMonthlyRainfall[83].MonthlyRainfall.RainfallTOTAL

    $(".StationNameThai").append(snt);
    $(".StationNameEnglish").append(sne);
    $(".Latitude").append(lat);
    $(".Longitude").append(lon);
    $(".MonthlyRainfall").append(mrf);
}

$.ajax({
    method: "GET",
    url: endpoint,
    success: function(data){
        setChart(data);
        insertDataToHomepage(data);
    },
    error: function(error_data){
        console.log("Endpoint GET request error");
        // console.log(error_data)
    }
})

$(document).ready(function () {

});