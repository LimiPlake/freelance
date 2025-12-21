// Get all quiz questions
const questions = document.querySelectorAll(".question");

// Hide all questions except the first one
questions.forEach((q, i) => {
  if (i !== 0) {
    q.style.display = "none";
  }
});

// Add behavior to each Submit button
questions.forEach((question, index) => {
  const button = question.querySelector("button");
  const radios = question.querySelectorAll("input[type='radio']");
  const feedback = question.querySelector(".feedback");

  button.addEventListener("click", () => {

    // Find selected radio button
    let selected = null;
    radios.forEach(radio => {
      if (radio.checked) {
        selected = radio;
      }
    });

    // If no answer selected, do nothing
    if (!selected) return;

    // Show feedback
    if (selected.dataset.correct === "true") {
      feedback.textContent = "✅ Correct!";
    } else {
      feedback.textContent = "❌ Incorrect";
    }

    // Lock question (one try only)
    radios.forEach(radio => {
      radio.disabled = true;
    });
    button.disabled = true;

    // Wait 10 seconds so feedback can be read
    setTimeout(() => {
      question.style.display = "none";

      // Show next question in the same place
      if (questions[index + 1]) {
        questions[index + 1].style.display = "block";
      }
    }, 10000);
  });
});
