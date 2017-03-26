$(function(){
/*var xhr = new XMLHttpRequest();
xhr.open("GET", "https://www.codecademy.com/", false);
xhr.send();

console.log(xhr.status); // will return 200 if status is good
console.log(xhr.statusText);//will return status if it is ok*/

//var json = JSON.parse(demo);


});

function initMap() {
 var myLatLng = {lat: 28.603329, lng: -81.199029};
  var map = new google.maps.Map(document.getElementById('map'), {
   center: myLatLng,
   zoom:17,
   scrollwheel:false
  });
  var marker = new google.maps.Marker({
   position: myLatLng,
   map:map,
   title:'Test'
  });
}
