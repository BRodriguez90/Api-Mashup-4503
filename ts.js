'<div class="col-md-4">' +
   '<div class="flip-container">' +
      '<div class="front">' +
         '<div class="pet_cards">' +
            '<img class="adopt_pet" src=' + field.media.photos.photo[3].$t + '>' +
            '<div class="card_info">' +
               '<p>Name: ' + field.name.$t + '</p>' +
               '<p>Sex: ' + field.sex.$t + '</p>' +
               '<i class="fa fa-paw" aria-hidden="true"></i><p>Location: ' + field.contact.city.$t + ', ' + field.contact.state.$t + '</p>' +
               '<i class="fa fa-calendar" aria-hidden="true"></i><p id="date">Last Updated: ' + extdate + '</p>' +
               '</div>' + // card_info end
            '</div>' + // pet_cards end
         '</div>' + // front end
         '<div class="back">' +
            '<p>test</p>' +
         '</div>'+ // back end
      '</div>' + // container end
   '</div>'; // col end



   '<div class="col-md-4">' +
      '<div class="pet_cards">' +
         '<img class="adopt_pet" src=' + field.media.photos.photo[3].$t + '>' +
         '<div class="card_info">' +
            '<p>Name: ' + field.name.$t + '</p>' +
            '<p>Sex: ' + field.sex.$t + '</p>' +
            '<i class="fa fa-paw" aria-hidden="true"></i><p>Location: ' + field.contact.city.$t + ', ' + field.contact.state.$t + '</p>' +
            '<i class="fa fa-calendar" aria-hidden="true"></i><p id="date">Last Updated: ' + extdate + '</p>' +
         '</div>' +
      '</div>' +
   '</div>';
