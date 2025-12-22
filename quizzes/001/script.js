document.addEventListener("DOMContentLoaded", () => {

  // Get all quiz questions
  const questions = document.querySelectorAll(".question");

  // Hide all questions except the first
  questions.forEach((q, i) => {
    if (i !== 0) {
      q.style.display = "none";
    }
  });

  // Add logic to each question
  questions.forEach((question, index) => {
    const submitButton = question.querySelector("button");
    const radios = question.querySelectorAll("input[type='radio']");
    const feedback = question.querySelector(".feedback");

    // Create "Next Question" button (hidden by default)
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next Question";
    nextButton.style.display = "none";
    question.appendChild(nextButton);

    submitButton.addEventListener("click", () => {

      // Find selected answer
      let selected = null;
      radios.forEach(radio => {
        if (radio.checked) {
          selected = radio;
        }
      });

      // Do nothing if no answer selected
      if (!selected) return;

      // Correct answer
      if (selected.dataset.correct === "true") {
        feedback.textContent = "✅ Correct!";

        // Lock question
        radios.forEach(radio => radio.disabled = true);
        submitButton.disabled = true;

        // Show Next button
        nextButton.style.display = "inline-block";

      } else {
        // Incorrect answer: allow retry, no hints
        feedback.textContent = "❌ Incorrect";
        selected.checked = false;
      }
    });

    // Move to next question only when user clicks Next
    nextButton.addEventListener("click", () => {
      question.style.display = "none";

      if (questions[index + 1]) {
        questions[index + 1].style.display = "block";
      }
    });
  });

});
