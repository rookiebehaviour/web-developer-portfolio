//Smooth Scroll

document.querySelectorAll("a[href^='#']").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const href = this.getAttribute("href");
    const element = document.querySelector(href);
    element.scrollIntoView({
      behavior: "smooth",
      duration: 2000,
    });

    if (href === "#home") {
      history.replaceState({}, "", "/");
    }
  });
});

// Dropdown arrow

const dropdownBtn = document.querySelector(".dropdown-btn");
const dropdownContent = document.querySelector(".dropdown-content");

dropdownBtn.addEventListener("click", function () {
  if (dropdownContent.style.display === "block") {
    dropdownContent.style.display = "none";
    dropdownBtn.innerText = "Show More";
  } else {
    dropdownContent.style.display = "block";
    dropdownBtn.innerText = "Show Less";
  }
});

dropdownBtn.addEventListener("click", function () {
  dropdownContent.classList.toggle("show");
});

// Form submission - Formspree

let form = document.getElementById("contact-form");

async function handleSubmit(event) {
  event.preventDefault();
  let name = event.target.name.value;
  let status = document.getElementById("contact-form-status");
  let data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        status.innerText = `Thanks ${name}, your message was sent to Jacqueline!`;
        form.reset();
      } else {
        response.json().then((data) => {
          if (Object.hasOwn(data, "errors")) {
            status.innerText = data["errors"]
              .map((error) => error["message"])
              .join(", ");
          } else {
            status.innerText =
              "Oops! There was a problem submitting your message, please retry.";
          }
        });
      }
    })
    .catch((error) => {
      status.innerText =
        "Oops! There was a problem submitting your message, please retry.";
    });
}
form.addEventListener("submit", handleSubmit);

window.onbeforeunload = () => {
  for (const form of document.getElementsByTagName("form")) {
    form.reset();
  }
};

// Skip Intro Animation

// Get a reference to the Skip button
const skipButton = document.getElementById("skip-animation");

// Add a click event listener to the Skip button
skipButton.addEventListener("click", () => {
  // Set a cookie to indicate that the user has chosen to skip the animation
  document.cookie = "skipAnimation=true; path=/";

  // Redirect the user to the home page
  window.location.href = "#home";

  // Show the navbar
  const navbar = document.querySelector("nav");
  navbar.style.opacity = "1";
  navbar.style.animation = "none";
});
