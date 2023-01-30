//Smooth Scroll

const debounce = (func, wait = 50) => {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait, ...arguments);
  };
};

document.querySelectorAll("a[href^='#']").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const href = this.getAttribute("href");
    const element = document.querySelector(href);
    element.scrollIntoView({
      behavior: "smooth",
      duration: 2000,
    });
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
        status.innerText = "Thanks for your submission!";
        form.reset();
      } else {
        response.json().then((data) => {
          if (Object.hasOwn(data, "errors")) {
            status.innerText = data["errors"]
              .map((error) => error["message"])
              .join(", ");
          } else {
            status.innerText = "Oops! There was a problem submitting your form";
          }
        });
      }
    })
    .catch((error) => {
      status.innerText = "Oops! There was a problem submitting your form";
    });
}
form.addEventListener("submit", handleSubmit);
