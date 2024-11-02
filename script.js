const phrases = [
  "Java Swing Developer. ",
  "Backend Developer. ",
  "Machine Learning Student. ",
  "Problem Solver. "
];

let currentPhraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedText = document.querySelector(".typed-text");
const greetingText = document.getElementById("greeting");

// Function to determine the greeting based on the current time
function getGreeting() {
  const hours = new Date().getHours();
  if (hours < 5) {
      return "Hallo, Gute Nacht"; // Night
  } else if (hours < 12) {
      return "Hallo, Guten Morgen"; // Morning (5 AM to 11:59 AM)
  } else if (hours < 18) {
      return "Hallo, Guten Tag"; // Afternoon (12 PM to 5:59 PM)
  } else if (hours < 21) {
      return "Hallo, Guten Abend"; // Evening (6 PM to 8:59 PM)
  } else {
      return "Hallo, Gute Nacht"; // Night (9 PM onwards)
  }
}


// Set the greeting in the h3 element
greetingText.textContent = getGreeting();

function type() {
  const currentPhrase = phrases[currentPhraseIndex];
  typedText.textContent = currentPhrase.substring(0, charIndex);

  if (isDeleting) {
      charIndex--;
      if (charIndex === 0) {
          isDeleting = false;
          currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length; // Move to the next phrase
      }
  } else {
      charIndex++;
      if (charIndex === currentPhrase.length) {
          isDeleting = true;
      }
  }

  const typingSpeed = isDeleting ? 50 : 100; // Speed for deleting and typing
  setTimeout(type, typingSpeed);
}

setTimeout(type, 200); // Initial delay before starting

$(document).ready(function () {

  $('#menu').click(function () {
    $(this).toggleClass('fa-times');
    $('header').toggleClass('toggle');
  });

  $(window).on('scroll load', function () {

    $('#menu').removeClass('fa-times');
    $('header').removeClass('toggle');

    if ($(window).scrollTop() > 0) {
      $('.top').show();
    } else {
      $('.top').hide();
    }

  });


  $('a[href*="#"]').on('click', function (e) {

    e.preventDefault();

    $('html, body').animate({

      scrollTop: $($(this).attr('href')).offset().top,

    },
      500,
      'linear'
    );

  });

});
const scriptURL = 'https://script.google.com/macros/s/AKfycbzFNj4HANEGgtfmX_Ar6V-OFfBxmE7RlcYk7VrOoUOBdNEH8bAZo08IhDupqHpbo8vWtQ/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")
form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => {
      msg.innerHTML = "Message sent successfully"
      setTimeout(function () {
        msg.innerHTML = ""
      }, 5000)
      form.reset()
    })
    .catch(error => console.error('Error!', error.message))
})
