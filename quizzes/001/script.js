/*
  LimiPlake – A Minor Scales Quiz
  Version: v-0.82

  Includes:
  - v-0.31: language consistency
  - v-0.32: no waiting / user-controlled navigation
  - Bug #3 fixed: retry allowed, no hints
  - v-0.80: finish screen
  - v-0.82: backward navigation added
*/

document.addEventListener("DOMContentLoaded", () => { 

  const questions = document.querySelectorAll(".question");
  const quizArea = document.getElementById("quiz-display-area");

  // Hide all questions except the first
  questions.forEach((q, i) => {
    if (i !== 0) q.style.display = "none";
  });

  // Finish screen
  const finishScreen = document.createElement("div");
  finishScreen.style.display = "none";
  finishScreen.innerHTML = `
    <h2>🎉 Quiz Complete</h2>
    <p>Thank you for completing the A Minor Scales Quiz.</p>
  `;
  quizArea.appendChild(finishScreen);

  questions.forEach((question, index) => {
    const submitButton = question.querySelector("button");
    const radios = question.querySelectorAll("input[type='radio']");
    const feedback = question.querySelector(".feedback");

    const isLastQuestion = index === questions.length - 1;

    /* ---------- Previous Button ---------- */
    const prevButton = document.createElement("button");
    prevButton.textContent = "Back";
    prevButton.style.marginTop = "16px";

    if (index === 0) {
  prevButton.style.display = "none";
} else {
  prevButton.style.display = "inline-block";
}

    question.appendChild(prevButton);

    /* ---------- Next / Finish Button ---------- */
    const nextButton = document.createElement("button");
    nextButton.textContent = isLastQuestion ? "Finish Quiz" : "Next Question";
    nextButton.style.display = "none";
    nextButton.style.marginTop = "16px";

    question.appendChild(nextButton);

    /* ---------- Submit Logic ---------- */
    submitButton.addEventListener("click", () => {
      let selected = null;

      radios.forEach(radio => {
        if (radio.checked) selected = radio;
      });

      if (!selected) return;

      if (selected.dataset.correct === "true") {
        feedback.textContent = "✅ Correct!";

        // Lock question
        radios.forEach(radio => radio.disabled = true);
        submitButton.disabled = true;

        nextButton.style.display = "inline-block";
      } else {
        feedback.textContent = "❌ Incorrect";
        selected.checked = false;
      }
    });

    /* ---------- Forward Navigation ---------- */
    nextButton.addEventListener("click", () => {
      question.style.display = "none";

      if (isLastQuestion) {
        finishScreen.style.display = "block";
      } else {
        questions[index + 1].style.display = "block";
      }
    });

    /* ---------- Backward Navigation ---------- */
    prevButton.addEventListener("click", () => {
      question.style.display = "none";
      questions[index - 1].style.display = "block";
    });
  });

});
