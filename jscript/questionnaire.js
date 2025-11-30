// questionnaire.js
// The Fit Zone - Questionnaire / Feedback Form
// Validates the feedback form, then submits results to https://httpbin.org/get

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("feedbackForm");
  const result = document.getElementById("feedbackResult");

  form.addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent form reload

    // collect form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const goal = document.getElementById("goal").value;
    const rating = document.getElementById("rating").value;
    const message = document.getElementById("message").value.trim();
    const agree = document.getElementById("agree").checked;

    // simple email pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // validation
    if (!name || !email || !goal || !rating || !message) {
      showResult("Please fill in all required fields.", "danger");
      return;
    }
    if (!emailPattern.test(email)) {
      showResult("Please enter a valid email address.", "danger");
      return;
    }
    if (message.length < 10) {
      showResult("Comments should be at least 10 characters long.", "danger");
      return;
    }
    if (!agree) {
      showResult("You must confirm the information before submitting.", "danger");
      return;
    }

    // prepare query string for GET request
    const params = new URLSearchParams({
      name: name,
      email: email,
      goal: goal,
      rating: rating,
      message: message,
      agreed: agree
    });

    try {
      // send GET request to httpbin.org
      const response = await fetch(`https://httpbin.org/get?${params.toString()}`);
      const data = await response.json();

      // display success message
      showResult("✅ Feedback sent successfully! Data submitted to httpbin.org/get", "success");

      // log full server response (optional for demo)
      console.log("Server Response:", data);

      form.reset();
    } catch (error) {
      showResult("Something went wrong while submitting the form.", "danger");
      console.error(error);
    }
  });

  // helper function
  function showResult(message, type) {
    result.className = `alert alert-${type}`;
    result.textContent = message;
    result.style.display = "block";
  }
});
