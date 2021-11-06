async function fetchJSON(json_path) {
  const response = await fetch(json_path);
  const json = await response.json();
  return json;
}

// let questionTemplate = {
//   responses: [{ responseString, correctBool }],
//   question: questionString,
//   author: authorName,
//   subject: subjectName,
// };
async function updateQuestionsSchema(json_path) {
  return fetchJSON(json_path).then((json) => {
    let lastid = 0;
    let questions = [];
    for (let i of json.questions) {
      let newQuestion = {
        id: lastid,
        subject: i.subject,
        author: i.author,
        question: i.question,
        responses: i.responses,
      };
      lastid++;
      questions.push(newQuestion);
    }
    return { lastid: lastid - 1 < 0 ? 0 : lastid - 1, questions: questions };
  });
}

//Mozilla
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

//StackOverFlow
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function showRandomQuestion(
  questions,
  previousQuestionNumber,
  lastQuestion
) {
  let answers_holder = document.querySelector("#answers_holder");
  answers_holder.innerHTML = "";
  let questionNumber = getRandomInt(0, questions.questions.length);
  //#region Question Information
  while (questionNumber == lastQuestion) {
    questionNumber = getRandomInt(0, questions.questions.length);
  }
  const questionData = questions.questions[questionNumber];
  question_text.textContent = questionData.question;
  question_details.querySelector("a").textContent = capitalizeFirstLetter(
    questionData.subject
  );
  question_number.textContent = previousQuestionNumber + 1;
  //#endregion
  //#region Answer Information
  for (let answer of questionData.responses) {
    let answer_group = document.createElement("div");
    let answer_button = document.createElement("div");
    let answer_text = document.createElement("div");
    answer_group.classList.add("answer_group");
    answer_button.classList.add("answer-button-no");
    answer_button.addEventListener("click", () => {
      if (answer.correct) alert("Correta");
    });
    answer_text.classList.add("answer_text");
    answer_text.textContent = capitalizeFirstLetter(answer.response);
    answer_group.appendChild(answer_button);
    answer_group.appendChild(answer_text);
    answers_holder.appendChild(answer_group);
    console.log(answer.response);
  }

  //#endregion
  return questionNumber;
}

// let actualQuestion = 0;
// let lastQuestion = 0;

fetchJSON("./testing/cards.json").then((questions) => {
  let actualQuestion = 0;
  let lastQuestion = 0;
  document.onkeypress = async function (e) {
    e = e || window.event;
    if (e.key == " ") {
      lastQuestion = await showRandomQuestion(
        questions,
        actualQuestion,
        lastQuestion
      );
      actualQuestion++;
    }
  };
});
