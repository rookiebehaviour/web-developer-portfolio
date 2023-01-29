//Smooth Scroll

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

function scrollTo(element) {
  window.scroll({
    behavior: "smooth",
    left: 0,
    top: element.offsetTop,
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const href = this.getAttribute("href");
    const element = document.querySelector(href);
    setTimeout(() => scrollTo(element), 3000);
  });
});

// Form submission - Formspree

var form = document.getElementById("contact-form");

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("contact-form-status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        status.innerText = "Your message is on it's way to Jacqueline!";
        form.reset();
      } else {
        response.json().then((data) => {
          if (Object.hasOwn(data, "errors")) {
            status.innerText = data["errors"]
              .map((error) => error["message"])
              .join(", ");
          } else {
            status.innerText = "Oops! There was a problem sending your message";
          }
        });
      }
    })
    .catch((error) => {
      status.innerText = "Oops! There was a problem sending your message";
    });
}
form.addEventListener("submit", handleSubmit);
