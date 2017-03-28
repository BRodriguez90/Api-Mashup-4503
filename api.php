<?php

   $petFindApi = 'http://api.petfinder.com/pet.find?format=json&key=7b6195f6609c531192c20efa3751c3d4&animal='.$_POST['animal'].'&breed='.$_POST['breed'].'&sex='.$_POST['gender'].'&count=10&location='.$_POST['location'].'&distance='.$_POST['distance'].'&callback=?';

   $pet_json = file_get_contents($petFindApi);
   $pet_array = json_decode($pet_json);

   //$shelter_id = $pet_array['petfinder']['pets']['pet']['shelterId']['$t'];
   print $pet_array;

?>
