
const setup = () => {
  let firstCard = undefined
  let secondCard = undefined
  var totalPairs = 3; // Total number of pairs
  var matches = 0; // Number of matched pairs
  var clicks = 0; // Number of clicks
  var timer = 0; // Timer for the game

  
  $(".card").on(("click"), function () {
    $(this).toggleClass("flip");

    if (!firstCard) {
      firstCard = $(this).find(".front_face")[0];
      console.log(firstCard)
    } else {
      secondCard = $(this).find(".front_face")[0];
      $(this).addClass("disabled");
      console.log(firstCard, secondCard);
      if (
        firstCard.src
        ==
        secondCard.src
      ) {
        console.log("match")
        $(`#${firstCard.id}`).parent().off("click");
        $(`#${secondCard.id}`).parent().off("click");
        firstCard = undefined;
        secondCard = undefined;
        console.log("First card: " + firstCard)
        console.log("Second card: " + secondCard)
      
      } else {
        console.log("no match")
        console.log("First card: " + firstCard)

        console.log("Second card: " + secondCard)
        setTimeout(() => {
          $(`#${firstCard.id}`).parent().toggleClass("flip")
          $(`#${secondCard.id}`).parent().toggleClass("flip")
          firstCard = undefined;
          secondCard = undefined;
        }, 1000)
      }
    }

  });
}

$(document).ready(setup);



  // Function to start the game
//   function startGame() {
//     // Reset game state
//     matches = 0;
//     clicks = 0;
//     timer = 0;
//     updateGameInfo();

//         // Compare the cards
//         if (card1 === card2) {
//           // Cards are a match
//           $('.selected').addClass('matched').removeClass('selected');
//           matches++;

//           // Check if all pairs are matched
//           if (matches === totalPairs) {
//             // Game over
//             clearInterval(timerInterval);
//             alert('Congratulations! You won the game.');
//           }
//         } else {
//           // Cards are not a match
//           setTimeout(function() {
//             $('.selected').find('.back_face').show();
//             $('.selected').find('.front_face').hide();
//             $('.selected').removeClass('selected');
//           }, 1000);
//         }

//         // Update game information
//         updateGameInfo();
//       }
//     });

//     // Start the timer
//     var timerInterval = setInterval(function() {
//       timer++;
//       updateGameInfo();
//     }, 1000);
//   }

//   // Function to update game information
//   function updateGameInfo() {
//     $('#total').text(totalPairs);
//     $('#matches').text(matches);
//     $('#left').text(totalPairs - matches);
//     $('#clicks').text(clicks);
//     $('#timer').text(timer);
//     $('#time').text(timer === 1 ? '' : 's');
//   }

//   // Bind click event to the "Start!" button
//   $('#start').click(function() {
//     startGame();
//   });
// });
