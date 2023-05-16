// Generates random pairs of pokemon
async function getRandomPokemon(numPokemonPairs) {
  const randomPokemon = [];
  for (i = 0; i < numPokemonPairs; i++) {

    // Math.random function call to get a random number between 1 and 810
    var randomPokemonID = Math.floor((Math.random() * 810)) + 1;

    // Checks if the randomPokemon array already includes the randomPokemonID
    // If it does, generate another random number
    if (randomPokemon.includes(randomPokemonID)){
      i--;
    } else {
    // Add a pair of matching pokemon if ID does not already exist in array
    randomPokemon.push(randomPokemonID);
    randomPokemon.push(randomPokemonID);
    }
  }

  // Shuffle array
  randomPokemon.sort(() => Math.random() - 0.5);

  // Iterates through the randomPokemon array
  for (i = 0; i < randomPokemon.length; i++){
    const pokemonID = randomPokemon[i];

    // retrieves image for respective pokemon ID and generates a card for that pokemon
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonID}`
    );
    $("#game_grid").append(`<div class="pokeCard">
    <img id="img${i}" class="front_face" src=${res.data.sprites.other["official-artwork"].front_default} alt="">
    <img class="back_face" src="back.webp" alt="">
  </div>`);
    }
  
}

const setup = () => {

  // Difficulty level
  var difficulty = "";
  

  // On-click even listeners attached to difficulty options
  $("#option1").click(function () {
    difficulty = $("#option1").val();
    console.log(difficulty)
  })
  
  $("#option2").click(function () {
    difficulty = $("#option2").val();
    console.log(difficulty)
  })

  $("#option3").click(function () {
    difficulty = $("#option3").val();
    console.log(difficulty)
  })


  // Function to initialize the game 
  function startGame() {


    // Buttons to allow user to switch between light and dark mode
    $("#dark").click(function () {
    $("#game_grid").css("background-color", "black");
    });
    $("#light").click(function () {
    $("#game_grid").css("background-color", "white");
    });

    //Upon starting game, make game grid, info, and theme buttons visible
    $("#start").css("display", "none");
    $("#game_grid").css("display", "");
    $("#info").css("display", "");
    $("#themes").css("display", "");


    // Initial variable declaration
    var firstCard = undefined;
    var secondCard = undefined;
    var totalPairs = 0; // Total number of pairs
    var matches = 0; // Number of matched pairs
    var clicks = 0; // Number of clicks
    var matchesLeft = totalPairs; // Number of matches remaining
    var timer = 0; // Timer for the game
    var time = 0;

    // New values assigned to variables based on difficulty selected
if (difficulty === "medium") {
      totalPairs = 6;
      timer = 200; 
      matchesLeft = totalPairs;
      $("#game_grid").css("width", "800px");
      $("#game_grid").css("height", "600px");
    } else if (difficulty === "hard") {
      totalPairs = 12;
      matchesLeft = totalPairs;
      timer = 300;
      $("#game_grid").css("width", "1200px");
      $("#game_grid").css("height", "800px");
    } else {
      timer = 100;
      totalPairs = 3;
      matchesLeft = totalPairs;
    }
    
    // Adds in value of the variables to their respective HTML 
    $("#clicks").text(clicks);
    $("#total").text(totalPairs);
    $("#matches").text(matches);
    $("#left").text(matchesLeft - matches);
    $("#timer").text(timer);
    $("#time").text(time);

    // Increments time by 1 - setInterval would otherwise start counting from 0 again
    time++;

    var matchTimer = setInterval(() => {
      // Stops the timer if time is up, subtracted 1 from time to properly display time on HTML
      if (time-1 === timer) {
        clearInterval(matchTimer);
        $("header").text("Time's up!");
        $("#game_grid").html("<a href='./index.html'> Try again! </a>");
        return;
      }
      $("#time").text(time++);
    }, 1000);

    const powerUp = function () {
    setTimeout(() => {
      alert("Power up!");
      $(".pokeCard").not(".disabled").toggleClass("flip");
      setTimeout(() => {
        $(".pokeCard").not(".disabled").toggleClass("flip");
      }, 1500);
    });
      var randomInterval = Math.random() * 30000;
      setInterval(powerUp, randomInterval);
  }


    // Function call to generate cards and attach event listeners
    getRandomPokemon(totalPairs).then(() => {
      $(".pokeCard").on("click", function () {
        
        if (!firstCard) {
          firstCard = $(this).find(".front_face")[0];
          $(this).toggleClass("flip");
          $(this).toggleClass("disabled");

          // Increments clicks on click and updates value shown in HTML
          clicks++;
          $("#clicks").text(clicks);
        } else {
          // If same card is clicked twice, nothing happens
          if ($(this).find(".front_face")[0] === firstCard) {
            return;
          }
          if (!secondCard) {
            secondCard = $(this).find(".front_face")[0];
            $(this).toggleClass("flip");
            $(this).toggleClass("disabled");
            clicks++;
            $("#clicks").text(clicks);
            console.log(clicks);
          } else {
            // If two cards are already clicked, do nothing
            return;
          }

          if (firstCard.src == secondCard.src) {
            matches++;
            $("#matches").text(matches);
            $("#left").text(matchesLeft - matches);

            // Turns off event listeners if matched
            $(`#${firstCard.id}`).parent().off("click");
            $(`#${secondCard.id}`).parent().off("click");

            //Resets first and secondCard variables
            firstCard = undefined;
            secondCard = undefined;

          } else {
            // if not a match, flip cards back over after a 1 second delay
            setTimeout(() => {
              $(`#${firstCard.id}`).parent().toggleClass("flip");
              $(`#${firstCard.id}`).parent().toggleClass("disabled");
              $(`#${secondCard.id}`).parent().toggleClass("flip");
              $(`#${secondCard.id}`).parent().toggleClass("disabled");
              firstCard = undefined;
              secondCard = undefined;
            }, 1000);
          }
        }
        // Stops timer and ends the game once the user has matched all the pairs
        if (matches == totalPairs) {
          setTimeout(() => {
            alert("You win!");
          }, 500);
          clearInterval(matchTimer);
          clearInterval(powerUp);
        }
      });
    });
   
  }

  // Adds event listener to start button, calls startGame function.
  $("#start").click(function () {
    startGame();
  });
};

$(document).ready(setup);
