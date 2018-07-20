let pet_info = [];
let shLatLng = [];
$(function() {
    const $rowAppend = $('#row_append');
    const petkey = "7b6195f6609c531192c20efa3751c3d4";
    const petBreedApi = 'http://api.petfinder.com/breed.list?format=json&key=';
    const petFindApi = 'http://api.petfinder.com/pet.find?format=json&key=';
    const petShelterApi = 'http://api.petfinder.com/shelter.get?format=json&key=';

    $('select#animal').on('click', function() {
        getBreed();
        $('.breed_select').show();
    }); //end of click event function

   function getBreed(){
        const fetchanimal = '&animal=' + $("#animal").val();
        const callback = '&callback=?';
        const $breed = $('#breed');

        $breed.children().remove();
        //fetch the different animal breeds
        $.getJSON(petBreedApi + petkey + fetchanimal + callback,
            function(data) {
                const {breed} = data.petfinder.breeds;
                breedsInput(breed);
            });

        //Loop through breeds and create an option to append to the select field
        function breedsInput(field){
            field.map(name => {
                let breed_name = name.$t;
                $breed.append(`<option value="${breed_name}"> ${breed_name} </option>`);
            })
        }
    }

    $(document).ajaxStart(function() {
        $('#rolling').show();
    });
    $(document).ajaxComplete(function() {
        $('#rolling').hide();
    });
   
   function findPet(){
        const fetchanimal = '&animal=' + $("#animal").val();               // grab animal type
        const fetchbreed = '&breed=' + $('#breed').val();                  // grab animal breed
        const fetchgender = '&sex=' + $('#gender').val();                  // grab sex of animal
        const fetchlocation = '&location=' + $('#location').val();         // grab location to search
        const callback = '&callback=?';

        $.getJSON(petFindApi + petkey + fetchanimal + fetchbreed + fetchgender + '&count=6' + fetchlocation + callback,
            (result) => {
                console.log(result);
                let {pets} = result.petfinder;
                if ($.isEmptyObject(pets)) { // if no results are found.
                    $('#row_append').append('<p id="noresults">No animal matches found.</p>'); //Message that let's user know no matches could be found.
                } else {
                    $.each(result.petfinder.pets.pet, (i, field) => {
                        const get_shelter = field.shelterId.$t;           					// get shelter ids
                        const lastUpdate = field.lastUpdate.$t;           					// get last updated info
                        const extDate = String(Date.parse(lastUpdate)).slice(0,15); // convert updated info object into a string and parse to readable format
                        const cardPhoto = field.media.photos.photo[2].$t;						//Animal Photo for the pet card
                        const cardCity = field.contact.city.$t;											//City where animal is located
                        const cardState = field.contact.state.$t;										//State where the animal is located
                        const cardMix = field.mix.$t;																//Whether the animal is of mixed breed
                        const cardName = field.name.$t;															//Name of the animal
                        let animalsSex = field.sex.$t;															//Sex of the animal
                        
                        const get_info = {                                //new object to be pushed into global pet_info array
                            name:field.name.$t,
                            age:field.age.$t,
                            description:field.description.$t,
                            city:field.contact.city.$t,
                            state:field.contact.state.$t,
                            phone:field.contact.phone.$t,
                            email:field.contact.email.$t,
                            picture:field.media.photos.photo[2].$t
                        };

                      (function noInfoGiven(){    //To check if there is no information for the given object fields
                           get_info.description === undefined ? get_info.description = "No description available." : get_info.description;
                           get_info.phone === undefined ? get_info.phone = "N/A" : get_info.phone;
                           get_info.email === undefined ? get_info.email = "N/A" : get_info.email;
                           animalsSex === "M" ? animalsSex = "Male" : "M";
                           animalsSex === "F" ? animalsSex = "Female" : "F";
                      })();
                     
                    pet_info.push(get_info);
                    
                    //Call function that creates pet cards 
                    petCards(cardPhoto,cardMix,animalsSex,cardCity,cardState,cardName,extDate);
                 		
                 		getShelter();

                 		function getShelter(){
                        $.getJSON(petShelterApi + petkey + '&id=' + get_shelter + '&callback=?', // Get shelter ids query string
                            (data2) => {
                                const noLatLng = () => {
                                    console.log(data2.petfinder.header.status.code.$t);
                                    data2.petfinder.header.status.code.$t === "300" ? console.log("Not Available") : console.log("Available");
                                }
                                noLatLng();

                                let latlng = {
                                    lat: data2.petfinder.shelter.latitude.$t,
                                    lng: data2.petfinder.shelter.longitude.$t,
                                    shelter: data2.petfinder.shelter.name.$t
                                };
                                shLatLng.push(latlng);
                            });
                      	}  		 //end getShelter();
                    });       // end each loop
                }            // end else
            });             // end getJSON

        function petCards(cardPhoto,cardMix,animalsSex,cardCity,cardState,cardName,extDate){
    
            const pet_card_info =                  // html for the pet cards
            `<div class="col-md-4">
                <div class="pet_cards">
                    <img class="adopt_pet" src= "${cardPhoto}"  data-position="80" data-blur="5" data-focus="10" data-falloff="20" data-direction="x">
                    <div class="card_info">
                        <p id="petsName">${cardName}</p>
                        <p><i class="fa fa-venus-mars" aria-hidden="true"></i>: ${animalsSex} <span id="mix">/ Mixed Breed:  ${cardMix} </p>
                        <i class="fa fa-paw" aria-hidden="true"></i><p>Location: ${cardCity}, ${cardState} </p>
                        <i class="fa fa-calendar" aria-hidden="true"></i><p id="date">Last Updated:  ${extDate} </p>
                    </div>
                </div>
            </div>`;
            
            //$('<input/>').attr('class', 'shelter_id').attr('type', 'hidden').attr('value', get_shelter).appendTo('.row');
            $rowAppend.append(pet_card_info);
                    
        }
    }                      //end of findPet function

    $('#search').on('click', function(e) {   //search for pets search button
        e.stopPropagation()
        $rowAppend.children().remove();
        $('.album').fadeIn(1250);
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
