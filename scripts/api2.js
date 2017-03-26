$(function(){

   //var k = "02D17E46482089F8721CF5579632E2E3";
   var petkey = "7b6195f6609c531192c20efa3751c3d4";
   //var petscret = "2a8d945c5e24848c8b467d2427047db9";
   var petBreedApi = 'http://api.petfinder.com/breed.list?format=json&key=';
   var petFindApi = 'http://api.petfinder.com/pet.find?format=json&key=';

   $('select#animal').on('mouseout',function(){ //
      getBreed();
   }); //end of click event function

   function getBreed(){
      var user = $("select").val();
      $('#breed').children().remove();
      $.getJSON( petBreedApi + petkey + '&animal=' + user + '&callback=?',
         function(data){
            console.log(data.petfinder.breeds.breed);
            $.each(data.petfinder.breeds.breed, function(i,field){
               $('#breed').append("<option value=\""+field.$t+"\">"+field.$t+"</option>");
               //$("#profile").append(field.$t + " ");
            }); // end of each
      }); // end of getJson
   } // end of getBreed function

}); // jQuery closing tag
