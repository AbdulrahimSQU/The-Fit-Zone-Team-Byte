// calculate.js
// The Fit Zone - BMI Calculator
// This script reads height and weight from the form, calculates BMI,
// determines the health category, and displays a message.

// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("bmiForm");
  const resultBox = document.getElementById("result");
  const bmiValue = document.getElementById("bmiValue");
  const bmiMessage = document.getElementById("bmiMessage");

  // Event listener for form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page reload

    // Get input values
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);

    // Check for valid input
    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
      bmiValue.textContent = "";
      bmiMessage.textContent = "Please enter valid positive numbers for both fields.";
      resultBox.style.display = "block";
      return;
    }

    // Calculate BMI (weight / (height in meters)^2)
    const heightMeters = height / 100;
    const bmi = weight / (heightMeters * heightMeters);
    const roundedBMI = bmi.toFixed(1);

    // Determine category and message
    let message = "";
    if (bmi < 18.5) {
      message = "You are underweight. Try eating more protein and doing strength training.";
    } else if (bmi < 25) {
      message = "You are at a healthy weight. Keep it up!";
    } else if (bmi < 30) {
      message = "You are overweight. Add some cardio and monitor your diet.";
    } else {
      message = "You are obese. Consider a fitness plan to reduce your BMI.";
    }

    // Display results
    bmiValue.textContent = roundedBMI;
    bmiMessage.textContent = message;
    resultBox.style.display = "block";
  });
});
