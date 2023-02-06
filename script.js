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

// Form submission - Formspree
document.addEventListener("DOMContentLoaded", function () {
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
});
