let currentSlide = 0;

function moveSlide(direction) {
  const slides = document.querySelectorAll(".carousel-slide");
  currentSlide = (currentSlide + direction + slides.length) % slides.length;
  const container = document.querySelector(".carousel-container");
  container.style.transform = `translateX(${-currentSlide * 100}%)`;
}

let currentIndex = 0;

function moveSlide1(direction) {
  const items = document.querySelectorAll(".carousel2-item");
  items[currentIndex].classList.remove("active");
  currentIndex = (currentIndex + direction + items.length) % items.length;
  items[currentIndex].classList.add("active");
}

// Get the modal
const modal = document.getElementById("contactModal");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Show the modal after 5 seconds
window.onload = function () {
  setTimeout(function () {
    modal.style.display = "block";
  }, 5000);
};

const scriptURL =
  "https://script.google.com/macros/s/AKfycbwpQKluWL0NMq_L5vCHyFxjOS0w_Uhv6Bxhbs7rClmqhqq0PiwRc_u175NNW4U7JK-2/exec";

const form = document.forms["user-form1"];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then(() => {
      window.location.reload();
    })
    .catch((error) => console.error("Error!", error.message));
});

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Validate phone number
    const phoneInput = document.getElementById("phone").value;
    const phonePattern = /^\d{10}$/;

    if (!phonePattern.test(phoneInput)) {
      alert("Please enter a valid 10-digit phone number.");
      return; // Stop the form submission if the phone number is invalid
    }

    // Construct form data
    const formData = new FormData(this);

    // Send the form data to Google Sheets using Fetch API
    fetch(this.action, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          alert(
            "Thank you! We are delighted to inform you that your special offer has been unlocked."
          ); // Show the confirmation popup
          this.reset(); // Optionally reset the form after submission
        } else {
          alert(
            "There was a problem with the form submission. Please try again."
          );
        }
      })
      .catch((error) => {
        console.error("Error!", error.message);
        alert(
          "There was a problem with the form submission. Please try again."
        );
      });
  });
