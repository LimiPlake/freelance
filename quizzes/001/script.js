/*
  LimiPlake – A Minor Scales Quiz
  Version: 1.1

  Features:
  - 6 questions
  - Mixed question types (image→text and text→image)
  - Question order randomized
  - Option order randomized
  - Unlimited retries
  - Single Submit button
  - Single Clear All button
  - Shows number of correct answers
*/

document.addEventListener("DOMContentLoaded", () => {

  const quizArea = document.getElementById("quiz-display-area");
  const submitAll = document.getElementById("submit-all");
  const clearAll = document.getElementById("clear-all");
  const resultBox = document.getElementById("quiz-result");

  // Convert NodeList to array so we can shuffle
  let questions = Array.from(document.querySelectorAll(".question"));

  /* ---------- Shuffle Helper (Fisher–Yates) ---------- */
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  /* ---------- Randomize Question Order ---------- */
  shuffle(questions);
  questions.forEach(q => quizArea.appendChild(q));

  /* ---------- Randomize Options Inside Each Question ---------- */
  questions.forEach(question => {
    const optionsRow = question.querySelector(".options-row");
    if (!optionsRow) return;

    const options = Array.from(optionsRow.children);
    shuffle(options);

    options.forEach(option => optionsRow.appendChild(option));
  });

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
        feedback.textContent = "🤔 That's not right. Try again.";
        incorrectCount++;
      } else {
        feedback.textContent = "✅ Correct!";
      }

    });

    const correctCount = totalQuestions - incorrectCount;

    if (correctCount === totalQuestions) {
      resultBox.textContent =
        `🎉 You got ${correctCount}/${totalQuestions} correct! Congratulations.`;
    } else {
      resultBox.textContent =
        `${correctCount}/${totalQuestions} correct. Try again.`;
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
