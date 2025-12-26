/*
  LimiPlake – A Minor Scales Quiz
  Version: 0.94

  Behavior:
  - All questions visible at once
  - Unlimited retries
  - One global Submit button
  - One global Clear All button
  - Per-question feedback (Correct / Incorrect)
  - Result message shown at bottom
  - NO page replacement
*/

document.addEventListener("DOMContentLoaded", () => {

  const questions = document.querySelectorAll(".question");
  const submitAll = document.getElementById("submit-all");
  const clearAll = document.getElementById("clear-all");
  const resultBox = document.getElementById("quiz-result");

  /* ---------- Submit Logic ---------- */
  submitAll.addEventListener("click", () => {

    let incorrectCount = 0;
    const totalQuestions = questions.length;

    questions.forEach(question => {
      const radios = question.querySelectorAll("input[type='radio']");
      const feedback = question.querySelector(".feedback");

      let selected = null;

      radios.forEach(radio => {
        if (radio.checked) {
          selected = radio;
        }
      });

      if (!selected || selected.dataset.correct !== "true") {
        feedback.textContent = "❌ Incorrect";
        incorrectCount++;
      } else {
        feedback.textContent = "✅ Correct";
      }
    });

    /* ---------- Result Message ---------- */
    if (incorrectCount === 0) {
      resultBox.textContent =
        `🎉 You got ${totalQuestions}/${totalQuestions} correct! Congratulations.`;
    } else {
      resultBox.textContent =
        `${incorrectCount}/${totalQuestions} answer(s) are incorrect, try again.`;
    }
  });

  /* ---------- Clear All Logic ---------- */
  clearAll.addEventListener("click", () => {

    questions.forEach(question => {
      const radios = question.querySelectorAll("input[type='radio']");
      const feedback = question.querySelector(".feedback");

      radios.forEach(radio => {
        radio.checked = false;
      });

      feedback.textContent = "";
    });

    resultBox.textContent = "";
  });

});
