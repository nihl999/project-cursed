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
  let question = getRandomInt(0, questions.questions.length);
  //#region Question Information
  while (question == lastQuestion) {
    question = getRandomInt(0, questions.questions.length);
  }
  question_text.textContent = questions.questions[question].question;
  question_details.querySelector("a").textContent = capitalizeFirstLetter(
    questions.questions[question].subject
  );
  question_number.textContent = previousQuestionNumber + 1;
  //#endregion
  //#region Answer Information

  //#endregion
  return question;
}

// let actualQuestion = 0;
// let lastQuestion = 0;

fetchJSON("./cards.json").then((questions) => {
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
