/*
  LimiPlake – A Minor Scales Quiz
  Version: 0.90

  Rules:
  - All questions visible at once
  - Unlimited retries
  - One Submit button
  - One Clear All button
  - Finish screen appears ONLY when all answers are correct
*/

document.addEventListener("DOMContentLoaded", () => {

  const questions = document.querySelectorAll(".question");
  const submitAll = document.getElementById("submit-all");
  const clearAll = document.getElementById("clear-all");
  const quizArea = document.getElementById("quiz-display-area");

  /* ---------- Finish Screen ---------- */
  const finishScreen = document.createElement("div");
  finishScreen.style.display = "none";
  finishScreen.innerHTML = `
    <h2>🎉 Quiz Complete</h2>
    <p>All answers are correct.</p>
  `;
  quizArea.appendChild(finishScreen);

  /* ---------- Submit Logic ---------- */
  submitAll.addEventListener("click", () => {

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

    if (allCorrect) {
      finishScreen.style.display = "block";
    }
  });

  /* ---------- Clear All ---------- */
  clearAll.addEventListener("click", () => {

    questions.forEach(question => {
      const radios = question.querySelectorAll("input[type='radio']");
      const feedback = question.querySelector(".feedback");

      radios.forEach(radio => {
        radio.checked = false;
      });

      feedback.textContent = "";
    });

    finishScreen.style.display = "none";
  });

});
