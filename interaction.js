/* Bilder som använts:
  Solig bild - http://g02.a.alicdn.com/kf/HTB157EMHVXXXXX1XpXXq6xXFXXXI/-font-b-Arnold-b-font-font-b-Schwarzenegger-b-font-font-b-Bodybuilder-b-font.jpg
  Kall bild - https://s-media-cache-ak0.pinimg.com/736x/65/a7/2f/65a72fb0c878e2aa7a8bf93b385b6a9a.jpg
  Molnig bild - http://www.fubiz.net/wp-content/uploads/2012/07/Cloudy-Film5.jpg
*/

$(document).ready(function(){
  $.get("https://api.ipify.org/?format=json", function(data, textStatus, jqXHR) {
    var ip = data.ip; // Helsingborg: 90.227.120.93

    $.get("https://murmuring-falls-19089.herokuapp.com/?ip="+ip, function(wData, wTextStatus, wJqXHR) {
      printData(wData);
    })
  })
})


function printData(data){
  $(".city-name").text(data.City);
  var foreCast = data.DailyForecasts[0];
  var cloudCover = foreCast.Day.CloudCover;
  var maxTemp = foreCast.Temperature.Maximum.Value;
  $(".short-phrase").text(foreCast.Day.ShortPhrase);
  $("#cloud-text").text("Cloudcover: "+cloudCover+"%")
  $("#cloud-prog").attr("aria-valuenow", cloudCover);
  $("#cloud-prog").attr("style", "width: "+cloudCover+"%");
  if(cloudCover > 40){
    $("#cloud-prog").attr("class", "progress-bar progress-bar-warning progress-bar-striped");
  }
  if(cloudCover > 50){
    $(".weather-img").attr("src", "img/cloud.jpg");
    $(".answer").text("Hella cloudy today, no sunbathing!");
    $("#cloud-prog").attr("class", "progress-bar progress-bar-danger progress-bar-striped");
  } else if(maxTemp < 18) {
    $(".weather-img").attr("src", "img/cold.jpg");
    $(".answer").text("Hella cold today, no sunbathing!");
  } else {
    $(".weather-img").attr("src", "img/sun.jpg");
    $(".answer").text("Perfect conditions, get of ya damn computer!")
  }
}
