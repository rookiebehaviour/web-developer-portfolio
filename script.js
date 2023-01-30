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

window.onbeforeunload = () => {
  for (const form of document.getElementsByTagName("form")) {
    form.reset();
  }
};

window.onload = function () {
  var el = document.getElementById("g-recaptcha-response");
  if (el) {
    el.setAttribute("required", "required");
  }
};
