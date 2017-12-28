var pet_info = [];
var shLatLng = [];
$(function() {
$  ('.carousel').carousel();
    var petkey = "7b6195f6609c531192c20efa3751c3d4";
    var petBreedApi = 'http://api.petfinder.com/breed.list?format=json&key=';
    var petFindApi = 'http://api.petfinder.com/pet.find?format=json&key=';
    var petShelterApi = 'http://api.petfinder.com/shelter.get?format=json&key=';

    $('.adopt_pet').tiltShift();
    $('select#animal').on('click', function() {
        getBreed();
        $('.breed_select').fadeIn();
    }); //end of click event function

    getBreed = () => {
        var fetchanimal = $("#animal").val();
        $('#breed').children().remove();
        $.getJSON(petBreedApi + petkey + '&animal=' + fetchanimal + '&callback=?',
            function(data) {
                console.log(data.petfinder.breeds.breed);
                $.each(data.petfinder.breeds.breed, function(i, field) {
                    $('#breed').append("<option value=\"" + field.$t + "\">" + field.$t + "</option>");
                });     // end of each
            });        // end of getJson
    }                 // end of getBreed function

    $(document).ajaxStart(function() {
        $('#rolling').show();
    });
    $(document).ajaxComplete(function() {
        $('#rolling').hide();
    });

    findPet = () => {
        var fetchanimal = $('#animal').val();                  // grab animal type
        var fetchbreed = $('#breed').val();                    // grab animal breed
        var fetchgender = $('#gender').val();                  // grab sex of animal
        var fetchlocation = $('#location').val();              // grab location to search
        $.getJSON(petFindApi + petkey + '&animal=' + fetchanimal + '&breed=' + fetchbreed + '&sex=' + fetchgender + '&count=6' + '&location=' + fetchlocation + /*'&distance=' + fetchdistance +*/ '&callback=?',
            (result) => {
                console.log(result);
                if ($.isEmptyObject(result.petfinder.pets)) { // if no results are found.
                    $('#row_append').append('<p id="noresults">No animal matches found.</p>');
                } else {
                    $.each(result.petfinder.pets.pet, function(i, field) {
                        var get_shelter = field.shelterId.$t;           // get shelter ids
                        var lastUpdate = field.lastUpdate.$t;           // get last updated info
                        var dateparse = String(Date.parse(lastUpdate)); // convert updated info object into a string and parse to readable format
                        var extdate = dateparse.slice(0,15);            //slice unwanted time info from date
                        
                        let get_info = {                                //new object to be pushed into global pet_info array
                            name: field.name.$t,
                            age: field.age.$t,
                            description: field.description.$t,
                            phone: field.contact.phone.$t,
                            email: field.contact.email.$t,
                            picture: field.media.photos.photo[2].$t
                        };
                       noInfoGiven = () => {                            //To check if there is no information for the given object fields 
                           get_info.description === undefined ? get_info.description = "No description available." : get_info.description;
                           get_info.phone === undefined ? get_info.phone = "N/A" : get_info.phone;
                           get_info.email === undefined ? get_info.email = "N/A" : get_info.email;
                       }
                        noInfoGiven();
                        pet_info.push(get_info);                       
                        $('.adopt_pet').tiltShift();
                        var pet_card_info =                  // html for the pet cards
                           '<div class="col-md-4">' +
                              '<div class="pet_cards">' +
                                 '<img class="adopt_pet tiltshift" src=' + field.media.photos.photo[3].$t + 'data-position="80" data-blur="5" data-focus="10" data-falloff="20" data-direction="x" >' +
                                 '<div class="card_info">' +
                                    '<p>Name: ' + field.name.$t + '</p>' +
                                    '<p>Sex: ' + field.sex.$t + '<span id="mix">/Mix: ' + field.mix.$t + '</p>' +
                                    '<i class="fa fa-paw" aria-hidden="true"></i><p>Location: ' + field.contact.city.$t + ', ' + field.contact.state.$t + '</p>' +
                                    '<i class="fa fa-calendar" aria-hidden="true"></i><p id="date">Last Updated: ' + extdate + '</p>' +
                                 '</div>' +
                              '</div>' +
                           '</div>';
                        $('<input/>').attr('class', 'shelter_id').attr('type', 'hidden').attr('value', get_shelter).appendTo('.row');
                        $('#row_append').append(pet_card_info);
                        //$('.row').append("<div class='col-md-4'><div class='pet_cards'><img class='adopt_pet' src=" + field.media.photos.photo[3].$t + "> <div class='card_info'><p>Name: " + field.name.$t + "</p><p>Sex: " + field.sex.$t + "</p>" + "<p>Location: " + field.contact.city.$t + ", " + field.contact.state.$t + "</p></div></div></div>");
                        //console.log(field.media.photos.photo[1].$t);

                        $.getJSON(petShelterApi + petkey + '&id=' + get_shelter + '&callback=?', // Get shelter ids query string
                            (data2) => {
                                noLatLng = () => {
                                    //console.log(data2.petfinder.header.status.code.$t);   
                                    data2.petfinder.header.status.code.$t === "300" ? console.log("Not Available") : console.log("Available");             
                                    if(data2.petfinder.header.status.code.$t === "300"){
                                     let noLat =  data2.petfinder.shelter.latitude.$t = "0";
                                     let noLng =  data2.petfinder.shelter.longitude.$t = "0";
                                     let noShelt = data2.petfinder.shelter.name.$t = "Not given.";
                                    }
                                }
                                noLatLng();
                               let latlng = {
                                    lat: data2.petfinder.shelter.latitude.$t,
                                    lng: data2.petfinder.shelter.longitude.$t,
                                    shelter: data2.petfinder.shelter.name.$t
                                };   
                               
                                shLatLng.push(latlng);
                              
                            });
                    });       // end each loop
                }            // end else
            });             // end getJSON
    }                      //end of findPet function

    $('#search').on('click', function(e) {   //search for pets search button
        e.preventDefault();
        $('#row_append').children().remove();
        $('.album').show();
       // new google.maps.event.trigger(map, "resize");
       pet_info = [];
       shLatLng = [];
        findPet();
    });


    // Add smooth scrolling to all links
      $("a").on('click', function(event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
          // Prevent default anchor click behavior
          event.preventDefault();

          // Store hash
          var hash = this.hash;

          // Using jQuery's animate() method to add smooth page scroll
          // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 800, function(){

            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
          });
        } // End if
      });

}); // jQuery closing tag
