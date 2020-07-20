function getWeather(position) {
  $.getJSON(getURL(position))
    .done(function(data) {
      $("#loc").text(data.name + ", " + data.sys.country);
      $("#temp").text(Math.round(data.main.temp) + " ℃");
      $("#desc").text(data.weather[0].main + ": " + 
                      data.weather[0].description);
      $("#icon").prop("src", data.weather[0].icon);
  })
    .fail(showError(err));
}

function getURL(position) {
  return "https://fcc-weather-api.glitch.me/api/current?lat=" + 
    position.coords.latitude + 
    "&lon=" + 
    position.coords.longitude;
}

function showError(err) {
  var errText = "";
  switch(err.code) {
    case err.PERMISSION_DENIED:
      errText = "User denied the request for Geolocation."
      break;
    default:
      errText = "An error ocurred getting geolocation."
    }
  $("#error").text(errText);
}

function toFarenheit(temp) {
  temp = temp.replace(/\D/g,'');
  temp = Math.round((temp * (9 / 5)) + 32);
  $("#temp").text(temp + "°F");
}

function toCelsius(temp) {
  temp = temp.replace(/\D/g,'');
  temp = Math.round((temp - 32) * (5 / 9));
  $("#temp").text(temp + " ℃");
}

$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation
      .getCurrentPosition(getWeather, showError);
  } else {
    $("#error").text("Geolocation not supported.")
  }
});

$(":checkbox").change(function() {
  if ($(":checkbox").is(":checked")) {
    toCelsius($("#temp").text());
  } else {
    toFarenheit($("#temp").text());
  }
});