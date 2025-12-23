/*
  LimiPlake – A Minor Scales Quiz
  Version: v-0.80

  Includes:
  - Bug #1 fixed (language consistency)
  - Bug #2 fixed (no waiting, no auto-advance)
  - Bug #3 fixed (retry allowed, no hints)
  - Question 3 ends with "Finish Quiz" and finish screen
*/

document.addEventListener("DOMContentLoaded", () => {

  const questions = document.querySelectorAll(".question");
  const quizArea = document.getElementById("quiz-display-area");

  // Hide all questions except the first
  questions.forEach((q, i) => {
    if (i !== 0) q.style.display = "none";
  });

  // Create finish screen (hidden initially)
  const finishScreen = document.createElement("div");
  finishScreen.style.display = "none";
  finishScreen.innerHTML = `
    <h2>🎉 Quiz Complete!</h2>
    <p>Thank you for completing the A Minor Scales Quiz!</p>
      `;
  quizArea.appendChild(finishScreen);

  // Attach logic to each question
  questions.forEach((question, index) => {
    const submitButton = question.querySelector("button");
    const radios = question.querySelectorAll("input[type='radio']");
    const feedback = question.querySelector(".feedback");

    const isLastQuestion = index === questions.length - 1;

    // Create navigation button
    const nextButton = document.createElement("button");
    nextButton.textContent = isLastQuestion ? "Finish Quiz" : "Next Question";
    nextButton.style.display = "none";
    nextButton.style.marginTop = "16px"; // spacing from yn feedback
    question.appendChild(nextButton);

    submitButton.addEventListener("click", () => {
      let selected = null;

      radios.forEach(radio => {
        if (radio.checked) selected = radio;
      });

      if (!selected) return;

      if (selected.dataset.correct === "true") {
        feedback.textContent = "✅ Correct!";

        // Lock question after correct answer
        radios.forEach(radio => radio.disabled = true);
        submitButton.disabled = true;

        // Allow user to move forward
        nextButton.style.display = "inline-block";

      } else {
        // Incorrect: allow retry, no hints
        feedback.textContent = "That's not right. Try again!";
        selected.checked = false;
      }
    });

    nextButton.addEventListener("click", () => {
      question.style.display = "none";

      if (isLastQuestion) {
        finishScreen.style.display = "block";
      } else {
        questions[index + 1].style.display = "block";
      }
    });
  });

});
