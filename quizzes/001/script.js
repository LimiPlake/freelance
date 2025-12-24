/*
  LimiPlake – A Minor Scales Quiz
  Version: 1.0

  Design:
  - All questions visible at once
  - One Submit button
  - Unlimited retries
  - Feedback per question
  - Finish screen appears ONLY when all answers are correct
  - One Clear All button resets everything
*/

document.addEventListener("DOMContentLoaded", () => {

  const questions = document.querySelectorAll(".question");
  const submitAllButton = document.getElementById("submit-all");
  const clearAllButton = document.getElementById("clear-all");
  const quizArea = document.getElementById("quiz-display-area");

  /* ---------- Finish Screen ---------- */
  const finishScreen = document.createElement("div");
  finishScreen.style.display = "none";
  finishScreen.innerHTML = `
    <h2>🎉 Quiz Complete</h2>
    <p>Thank you for taking this quiz.</p>
  `;
  quizArea.appendChild(finishScreen);

  /* ---------- Submit Logic ---------- */
  submitAllButton.addEventListener("click", () => {

    let allCorrect = true;

    questions.forEach(question => {
      const radios = question.querySelectorAll("input[type='radio']");
      const feedback = question.querySelector(".feedback");

      let selected = null;

      radios.forEach(radio => {
        if (radio.checked) selected = radio;
      });

      if (!selected || selected.dataset.correct !== "true") {
        feedback.textContent = "🤔 That's not the answer. Try again.";
        allCorrect = false;
      } else {
        feedback.textContent = "✅ Correct";
      }
    });

    // Show finish screen only if EVERYTHING is correct
    if (allCorrect) {
      finishScreen.style.display = "block";
    }
  });

  /* ---------- Clear All Logic ---------- */
  clearAllButton.addEventListener("click", () => {

    questions.forEach(question => {
      const radios = question.querySelectorAll("input[type='radio']");
      const feedback = question.querySelector(".feedback");

      radios.forEach(radio => {
        radio.checked = false;
      });

      feedback.textContent = "";
    });

    // Hide finish screen
    finishScreen.style.display = "none";
  });

});
