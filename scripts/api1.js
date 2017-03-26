$(function(){
   $('button').click(function(){
   var qs = $('#search').val();
   var service_url = 'https://kgsearch.googleapis.com/v1/entities:search';
    var params = {
      'query': 'Taylor Swift',
      'limit': 10,
      'indent': true,
      'key' : 'AIzaSyAiLvjIbaySEKullv0nsGuJE47uolVDz48',
    };
      console.log(qs);
    $.getJSON(service_url + '?callback=?', params, function(response) {
      $.each(response.itemListElement, function(i, element) {
        $('<div>', {text:element['result']['name']}).appendTo(document.body);
      });
    });
});


});


var myLatLng;
var map;
var marker;
function initMap() {
  myLatLng = {lat: 28.603329, lng: -81.199029};
  map = new google.maps.Map(document.getElementById('map'), {
   center: myLatLng,
   zoom:17,
   scrollwheel:false
  });
  marker = new google.maps.Marker({
   position: myLatLng,
   map:map,
   title:'Test'
  });
}

//var json = JSON.parse(demo);
