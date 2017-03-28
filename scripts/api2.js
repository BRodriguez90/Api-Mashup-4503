$(function(){

   //var k = "02D17E46482089F8721CF5579632E2E3";
   var petkey = "7b6195f6609c531192c20efa3751c3d4";
   //var petscret = "2a8d945c5e24848c8b467d2427047db9";
   var petBreedApi = 'http://api.petfinder.com/breed.list?format=json&key=';
   var petFindApi = 'http://api.petfinder.com/pet.find?format=json&key=';
   var petShelterApi = 'http://api.petfinder.com/shelter.get?format=json&key=';

   $('select#animal').on('mouseout',function(){ //
      getBreed();
   }); //end of click event function

   function getBreed(){
      var fetchanimal= $("#animal").val();
      $('#breed').children().remove();
      $.getJSON( petBreedApi + petkey + '&animal=' + fetchanimal + '&callback=?',
         function(data){
            console.log(data.petfinder.breeds.breed);
            $.each(data.petfinder.breeds.breed, function(i,field){
               $('#breed').append("<option value=\""+field.$t+"\">"+field.$t+"</option>");
               //$("#profile").append(field.$t + " ");
            }); // end of each
      }); // end of getJson
   } // end of getBreed function
   function findPet(){
      var fetchanimal = $('#animal').val(); // grab animal type
      var fetchbreed = $('#breed').val(); // grab animal breed
      var fetchgender = $('#gender').val(); // grab sex of animal
      var fetchlocation = $('#location').val(); // grab location to search
      //var fetchdistance = $('#distance').val(); // distance to search within
      $.getJSON( petFindApi + petkey + '&animal=' + fetchanimal + '&breed=' + fetchbreed + '&sex=' + fetchgender + '&count=10' + '&location=' + fetchlocation + /*'&distance=' + fetchdistance +*/ '&callback=?',
         function(data){
            console.log(data);
            if ($.isEmptyObject(data.petfinder.pets)) { // if no results are found.
               $('#profile').append('<p>No animal matches found.</p>');
            } else {
               $.each(data.petfinder.pets.pet, function(i,field){
                  var getShelter = field.shelterId.$t;
                  console.log(getShelter);
                  $('<input/>').attr('class','shelter_id').attr('type','hidden').attr('value',getShelter).appendTo('#profile');
                  $('<img/>').attr('src', field.media.photos.photo[1].$t).appendTo('#profile');
                  $('#profile').append("<p> Name:" + field.name.$t + " " + "Sex:" + field.sex.$t + " " + "Location:" + field.contact.city.$t + "," + field.contact.state.$t + "</p>");
                  //console.log(field.media.photos.photo[1].$t);
               }); // end each loop
            } // end else
         }); // end getJSON
   };// end of findPet function
   function findShelter(){
      
   }

   $('#search').on('click', function(e){ //search for pets search button
      e.preventDefault();
      $('#profile').children().remove();
      findPet();
   });
}); // jQuery closing tag
var myLatLng;
var map;
var marker;
function initMap() {
  myLatLng = {lat: 27.6021, lng: -81.5114};
  map = new google.maps.Map(document.getElementById('map'), {
   center: myLatLng,
   zoom:8,
   scrollwheel:false
  });
  marker = new google.maps.Marker({
   position: myLatLng,
   map:map,
   title:'Test'
  });
  marker = new google.maps.Marker({
   position:{lat: 28.603329, lng: -81.199029},
   map:map,
   title:'sdfsf'
  });
}
