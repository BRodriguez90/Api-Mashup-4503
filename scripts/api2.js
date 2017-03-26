$(function(){

   //var k = "02D17E46482089F8721CF5579632E2E3";
   var petkey = "7b6195f6609c531192c20efa3751c3d4";
   var petscret = "2a8d945c5e24848c8b467d2427047db9";
   var petApi = 'http://api.petfinder.com/breed.list?format=json&key=';
   $('#animal').click(function(){
      var user = $("select").val();
      $('#breed').children().remove();
      //var steamApi = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="+k+"&jsoncallback=?";
      $.getJSON( petApi + petkey + '&animal=' + user + '&callback=?',
         function(data){
            console.log(data.petfinder.breeds.breed);
            $.each(data.petfinder.breeds.breed, function(i,field){
               $('#breed').append("<option value=\""+field.$t+"\">"+field.$t+"</option>");
               //$("#profile").append(field.$t + " ");
            });
      });

      /*$.ajax({
         url:'http://api.petfinder.com/breed.list?format=json&key='+petkey+'&animal='+user+'&jsoncallback=?',
         type:'GET',
         dataType:'json',
         success:function(results){
            alert(results);
         }
      });*/


   });
});
