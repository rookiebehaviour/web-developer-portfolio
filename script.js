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

// Form Submissions - Netlify

const handleSubmit = (event) => {
  event.preventDefault();

  const myForm = event.target;
  const formData = new FormData(myForm);

  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  })
    .then(() => console.log("Form successfully submitted"))
    .catch((error) => alert(error));
};

document.querySelector("form").addEventListener("submit", handleSubmit);

// Google captcha

function onSubmit(token) {
  document.getElementById("contact-form").submit();
}

exports.handler = async function (event, context) {
  const value = process.env.SITE_KEY;

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Value of MY_IMPORTANT_VARIABLE is ${value}.`,
    }),
  };
};
