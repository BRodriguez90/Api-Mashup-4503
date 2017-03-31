<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
       <title></title>
       <link rel="stylesheet" href="css/normalize.css">
       <link rel="stylesheet" href="css/reset.css">
       <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
       <link rel="stylesheet" href="css/cover.css">
       <link rel="stylesheet" href="css/styles.css">
   </head>

   <body>
<?php ?>
      <!--<input type="text" id="search" name="text" placeholder="Enter something...">-->
      <form action="" method="POST" name="findpet">
         <label for="location">Location</label>
         <input type="text" required placeholder="Ex: Orlando, Fl or 32804" id="location" name="location">
         <!--<label for="distance">Distance</label>
         <select id="distance" name="distance">
            <option class="pet_distance" value="10">Within 10 miles</option>
            <option class="pet_distance" value="25">Within 25 miles</option>
            <option class="pet_distance" value="50">Within 50 miles</option>
            <option class="pet_distance" value="100">Within 100 miles</option>
         </select>-->

         <label for="animal">Type of animal</label>
         <select id="animal" require name="animal" title="Animal type">
            <option class="animal" name="animal" selected value="">Any</option>
            <option class="animal" name="animal" value="dog">Dog</option>
            <option class="animal" name="animal" value="cat">Cat</option>
            <option class="animal" name="animal" value="rabbit">Rabbit</option>
            <option class="animal" name="animal" value="smallfurry">Smallfurry</option>
            <option class="animal" name="animal" value="horse">Horse</option>
            <option class="animal" name="animal" value="bird">Bird</option>
            <option class="animal" name="animal" value="reptile">Reptile</option>
            <option class="animal" name="animal" value="barnyard">Barnyard</option>
            <option class="animal" name="animal" value="pig">Pig</option>
         </select>
         <label for="breed">Select Breed</label>
         <select id="breed" name="breed">
            <option class="s_breed" id="s_breed" label="Breed" selected></option>
         </select>
         <!--<label for="baby">Baby</label>
         <input type="checkbox" name="age" id="baby" value="Baby">
         <label for="young">Young</label>
         <input type="checkbox" name="age" id="young" value="Young">
         <label for="adult">Adult</label>
         <input type="checkbox" name="age" id="adult" value="Adult">
         <label for="senior">Senior</label>
         <input type="checkbox" name="age" id="senior" value="Senior">-->
         <select id="gender" name="gender">
            <option value="M">Male</option>
            <option value="F">Female</option>
         </select>
         <input type="submit" name="test" id="testsearch" value="testsearch">
         <input type="submit" name="search" id="search" value="Lookup pets">
      </form>
      <div class="container">
         <div class="row">
            <img src="images/rolling.svg" id="rolling" alt="loading animals">
            <!--<div id="profile"></div>-->

         </div>
      </div>
      <div id="map"></div>
      <script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAiLvjIbaySEKullv0nsGuJE47uolVDz48&callback=initMap" async defer></script>
      <script src="scripts/api2.js"></script>
   </body>
</html>
