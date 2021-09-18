const state = {
  isAsc: true,
};

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function uploadQuestions() {
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const question = params.get("question");
  const description = params.get("description");
  const pseudoname = params.get("pseudoname");
  const tableBody = document.getElementById("questions_wrapper");
  tableBody.innerHTML = "";
    const questionCard = document.createElement("div");
    const questionCardContent = document.createElement("div");
    const questionCardNav = document.createElement("div");
    const questionCardContentPseudonym = document.createElement("h3");
    const questionCardContentName = document.createElement("h4");
    const questionCardDescription = document.createElement("p");
    const questionCardNavDeleteQuestion = document.createElement("button");
    const questionCardNavUpdateQuestion = document.createElement("button");
    const questionCardNavAnswerQuestion = document.createElement("button");
    questionCard.classList.add("question_card");
    questionCardContent.classList.add("question_card_content");
    questionCardNav.classList.add("question_card_nav");
    questionCardNavDeleteQuestion.classList.add("main_button");
    questionCardNavUpdateQuestion.classList.add("main_button");
    questionCardNavAnswerQuestion.classList.add("main_button");
    questionCardNavDeleteQuestion.innerText = "Delete the question";
    questionCardNavUpdateQuestion.innerText = "Update the question";
    questionCardNavAnswerQuestion.innerText = "Answer the question";
    questionCardNavAnswerQuestion.addEventListener('click', () => {
      document.getElementById("myForm").style.display = "block";
    });
    questionCardNavUpdateQuestion.addEventListener('click', () => {
      window.location.href = `add_question.html?question=${question}&description=${description}&pseudoname=${pseudoname}&id=${id}`;
    });
    questionCardNavDeleteQuestion.addEventListener("click", async () => {
      await deteleQeustion(id);
    });
    questionCardContent.append(questionCardContentPseudonym, questionCardContentName, questionCardDescription);
    questionCardNav.append(questionCardNavAnswerQuestion, questionCardNavUpdateQuestion, questionCardNavDeleteQuestion);
    questionCard.append(questionCardContent, questionCardNav);
    questionCardContentPseudonym.innerText = pseudoname;
    questionCardContentName.innerText = question;
    questionCardDescription.innerText = description;
    tableBody.append(questionCard);
}

function uploadAnswers(answers) {
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const tableBody = document.getElementById("answers_wrapper");
  tableBody.innerHTML = "";
  answers.forEach((answers) => {
    const updateStatus = answers.updatedDate;
    const answerCard = document.createElement("div");
    const answerCardContent = document.createElement("div");
    const answerCardNav = document.createElement("div");
    // const answerCardDate = document.createElement("p");
    const answerCardContentPseudonym = document.createElement("h3");
    const answerCardContentAnswer = document.createElement("h4");
    const answerCardNavDeleteAnswer = document.createElement("button");
    const answerCardNavUpdateAnswer = document.createElement("button");
    answerCard.classList.add("answer_card");
    answerCardContent.classList.add("answer_card_content");
    answerCardNav.classList.add("answer_card_nav");
    answerCardNavDeleteAnswer.classList.add("main_button");
    answerCardNavUpdateAnswer.classList.add("main_button");
    answerCardNavDeleteAnswer.innerText = "Delete the answer";
    answerCardNavUpdateAnswer.innerText = "Update the answer";
    answerCardNavUpdateAnswer.addEventListener('click', () => {
      document.getElementById("myForm").style.display = "block";
      const data = {
        id: answers._id,
        preloadPseudoname: answers.pseudonym,
        preloadAnswer: answers.answer,
      }
      prefillForm(data);
    });
    answerCardNavDeleteAnswer.addEventListener("click", async () => {
      // await deteleQeustion();
      fetchAnswers();
    });
    answerCardContent.append(answerCardContentPseudonym, answerCardContentAnswer);
    answerCardNav.append( answerCardNavUpdateAnswer, answerCardNavDeleteAnswer);
    answerCard.append(answerCardContent, answerCardNav);
    if (!updateStatus) {
      answerCardContentPseudonym.innerText = answers.pseudonym;
    } else {
      answerCardContentPseudonym.innerText = answers.pseudonym + ' (edited)';
    }
    answerCardContentAnswer.innerText = answers.answer;
    tableBody.append(answerCard);
  });
  }

function fetchAnswers() {
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  fetch(`http://127.0.0.1:8080/questions/${id}/answers`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("No response");
      }
      return response.json();
    })
    .then((data) => uploadAnswers(data))
    .catch((error) => alert(error));
}

function deteleQeustion(id) {
  return fetch(`http://127.0.0.1:8080/questions/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete pet");
      }

      alert("Question deleted");
      window.location.href = 'index.html';
    })
    .catch((error) => alert(error));
}

function addAnswer(dataForm) {
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  fetch(`http://127.0.0.1:8080/questions/${id}/answers`, {
  method: 'POST',
  headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
  },
  body: JSON.stringify(dataForm)
}).then(response => {
  if(!response.ok) {
      throw new Error('Failed to submit answer')
  }
  document.getElementById("add_answer").reset();
  alert('Your answer is submited');
  closeForm();
  fetchAnswers();
}).catch(error => alert(error));
}

function updateAnswer(id, dataForm) {
  fetch(`http://127.0.0.1:8080/answers/${id}`, {
  method: 'PATCH',
  headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
  },
  body: JSON.stringify(dataForm)
}).then(response => {
  if(!response.ok) {
      throw new Error('Failed to update answer')
  }
  alert('Answer is updated');
  window.location.reload();
}).catch(error => alert(error));
}

function getAnswer(e) {
  e.preventDefault();
  const pseudoname = document.getElementById('insert_pseudonym').value;
  const answer = document.getElementById('insert_answer').value;
  const id = document.getElementById('submit_button').value;
  if (!pseudoname || !answer) {
      return alert('All fields must be filled')
  } else {
  const dataForm = {
      pseudoname: pseudoname,
      answer: answer,
      id: id,
  }
  if (id) {
    console.log(dataForm);
      return updateAnswer(id, dataForm);
  }else {
      addAnswer(dataForm)
  }
  }
}

function prefillForm(data) {
  console.log(data.preloadPseudoname);
  document.getElementById("insert_pseudonym").value = data.preloadPseudoname;
  document.getElementById("insert_answer").value = data.preloadAnswer;
  document.getElementById('submit_button').value = data.id;
}

uploadQuestions()

fetchAnswers()

document.getElementById('add_answer').addEventListener('submit', getAnswer)

// prefillFormFromQueryParams();

// fetchquestions();
