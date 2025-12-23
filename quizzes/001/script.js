/*
  LimiPlake – A Minor Scales Quiz
  Version: v-0.84

  Includes:
  - v-0.31: language consistency
  - v-0.32: no waiting / user-controlled navigation
  - Bug #3 fixed: retry allowed, no hints
  - v-0.80: finish screen
  - v-0.82: backward navigation
  - v-0.84: progress indicator (Question _/_)
*/

document.addEventListener("DOMContentLoaded", () => {

  const questions = document.querySelectorAll(".question");
  const quizArea = document.getElementById("quiz-display-area");
  const totalQuestions = questions.length;

  /* ---------- Progress Indicator ---------- */
  const progress = document.createElement("div");
  progress.style.marginBottom = "12px";
  progress.style.fontFamily = "Helvetica, Arial, system-ui, sans-serif";
  progress.style.fontSize = "14px";
  quizArea.prepend(progress);

  function updateProgress(index) {
    progress.textContent = `Question ${index + 1}/${totalQuestions}`;
    progress.style.display = "block";
  }

  /* ---------- Initial State ---------- */
  questions.forEach((q, i) => {
    if (i !== 0) q.style.display = "none";
  });

  updateProgress(0);

  /* ---------- Finish Screen ---------- */
  const finishScreen = document.createElement("div");
  finishScreen.style.display = "none";
  finishScreen.innerHTML = `
    <h2>🎉 Quiz Complete</h2>
    <p>Thank you for completing the A Minor Scales Quiz.</p>
  `;
  quizArea.appendChild(finishScreen);

  /* ---------- Question Logic ---------- */
  questions.forEach((question, index) => {
    const submitButton = question.querySelector("button");
    const radios = question.querySelectorAll("input[type='radio']");
    const feedback = question.querySelector(".feedback");

    const isLastQuestion = index === totalQuestions - 1;

    /* ----- Back Button ----- */
    const prevButton = document.createElement("button");
    prevButton.textContent = "Back";
    prevButton.style.marginTop = "16px";

    if (index === 0) {
      prevButton.style.display = "none";
    } else {
      prevButton.style.display = "inline-block";
    }

    question.appendChild(prevButton);

    /* ----- Next / Finish Button ----- */
    const nextButton = document.createElement("button");
    nextButton.textContent = isLastQuestion ? "Finish Quiz" : "Next Question";
    nextButton.style.display = "none";
    nextButton.style.marginTop = "16px";

    question.appendChild(nextButton);

    /* ----- Submit Logic ----- */
    submitButton.addEventListener("click", () => {
      let selected = null;

      radios.forEach(radio => {
        if (radio.checked) selected = radio;
      });

      if (!selected) return;

      if (selected.dataset.correct === "true") {
        feedback.textContent = "✅ Correct!";

        radios.forEach(radio => radio.disabled = true);
        submitButton.disabled = true;

        nextButton.style.display = "inline-block";
      } else {
        feedback.textContent = "That's not the answer. Try again.";
        selected.checked = false;
      }
    });

    /* ----- Forward Navigation ----- */
    nextButton.addEventListener("click", () => {
      question.style.display = "none";

      if (isLastQuestion) {
        progress.style.display = "none";
        finishScreen.style.display = "block";
      } else {
        questions[index + 1].style.display = "block";
        updateProgress(index + 1);
      }
    });

    /* ----- Backward Navigation ----- */
    prevButton.addEventListener("click", () => {
      question.style.display = "none";
      questions[index - 1].style.display = "block";
      updateProgress(index - 1);
    });
  });

});
