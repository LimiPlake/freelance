/*
  LimiPlake – A Minor Scales Quiz
  Version: 0.90

  Rules:
  - All questions visible at once
  - Unlimited retries
  - One Submit button
  - One Clear All button
  - When ALL answers are correct:
      wait 2 seconds
      then replace everything with the finish screen
*/

document.addEventListener("DOMContentLoaded", () => {

  const questions = document.querySelectorAll(".question");
  const submitAll = document.getElementById("submit-all");
  const clearAll = document.getElementById("clear-all");
  const quizArea = document.getElementById("quiz-display-area");

  /* ---------- Finish Screen ---------- */
  const finishScreen = document.createElement("div");
  finishScreen.innerHTML = `
    <h2>🎉 Quiz Complete</h2>
    <p>Thank you for taking this quiz.</p>
  `;

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
        feedback.textContent = "❌ Incorrect";
        allCorrect = false;
      } else {
        feedback.textContent = "✅ Correct";
      }
    });

    // If everything is correct, wait 2 seconds then replace the quiz
    if (allCorrect) {
      setTimeout(() => {
        quizArea.innerHTML = "";
        quizArea.appendChild(finishScreen);
      }, 2000);
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
  });

});
