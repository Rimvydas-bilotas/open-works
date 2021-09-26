const state = {
  isAsc: true,
};

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function uploadQuestions(questions) {
  const tableBody = document.getElementById("questions_wrapper");
  tableBody.innerHTML = "";
  questions.forEach((questions) => {
    const updateStatus = questions.updatedDate;
    const questionCard = document.createElement("div");
    const questionCardContent = document.createElement("div");
    const questionCardNav = document.createElement("div");
    const questionCardContentPseudonym = document.createElement("h3");
    const questionCardContentName = document.createElement("h4");
    const questionCardDescription = document.createElement("p");
    const questionCardNavAddAnswer = document.createElement("button");
    const questionCardNavReadAnswers = document.createElement("button");
    const questionCardNavDeleteQuestion = document.createElement("button");
    const questionCardNavUpdateQuestion = document.createElement("button");
    questionCard.classList.add("question_card");
    questionCardContent.classList.add("question_card_content");
    questionCardNav.classList.add("question_card_nav");
    questionCardNavAddAnswer.classList.add("main_button");
    questionCardNavReadAnswers.classList.add("main_button");
    questionCardNavDeleteQuestion.classList.add("main_button");
    questionCardNavUpdateQuestion.classList.add("main_button");
    questionCardNavAddAnswer.innerText = "Write an answer";
    questionCardNavReadAnswers.innerText = "Read posted answers";
    questionCardNavDeleteQuestion.innerText = "Delete the question";
    questionCardNavUpdateQuestion.innerText = "Update the question";
    // questionCardNavAddAnswer.value = questions._id;
    questionCardNavUpdateQuestion.addEventListener("click", () => {
      window.location.href = `add_question.html?question=${questions.question}&description=${questions.description}&pseudoname=${questions.pseudonym}&id=${questions._id}`;
    });
    questionCardNavReadAnswers.addEventListener("click", () => {
      window.location.href = `question_content.html?question=${questions.question}&description=${questions.description}&pseudoname=${questions.pseudonym}&id=${questions._id}`;
    });
    questionCardNavDeleteQuestion.addEventListener("click", async () => {
      await deteleQeustion(questions._id);
      fetchquestions();
    });
    questionCardNavAddAnswer.addEventListener("click", () => {
      document.getElementById("myForm").style.display = "block";
      document.getElementById('submit_button').value = questions._id;
    });
    questionCardContent.append(
      questionCardContentPseudonym,
      questionCardContentName,
      questionCardDescription
    );
    questionCardNav.append(
      questionCardNavAddAnswer,
      questionCardNavReadAnswers,
      questionCardNavUpdateQuestion,
      questionCardNavDeleteQuestion
    );
    questionCard.append(questionCardContent, questionCardNav);
    if (!updateStatus) {
      questionCardContentPseudonym.innerText = questions.pseudonym;
    } else {
      questionCardContentPseudonym.innerText = questions.pseudonym + ' (edited)';
    }
    questionCardContentName.innerText = questions.question;
    questionCardDescription.innerText = questions.description;
    tableBody.append(questionCard);
  });
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
    })
    .catch((error) => alert(error));
}

function fetchquestions() {
  fetch(
    `http://127.0.0.1:8080/questions/`
    //
    //   ?sort=${
    //     state.isAsc ? "asc" : "dsc"
    //   }`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("No response");
      }
      return response.json();
    })
    .then((data) => uploadQuestions(data))
    .catch((error) => alert(error));
}

function addAnswer(dataForm) {
  const id = document.getElementById('submit_button').value;
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
}).catch(error => alert(error));
}

function getAnswer(e) {
  e.preventDefault();
  const pseudoname = document.getElementById('insert_pseudonym').value;
  const answer = document.getElementById('insert_answer').value;
  // const params = new URLSearchParams(location.search);
  // const id = params.get('id');
  const id = document.getElementById('submit_button').value;
  if (!pseudoname || !answer) {
      return alert('All fields must be filled')
  } else {
  const dataForm = {
      pseudoname: pseudoname,
      answer: answer,
      id: id,
  }
  // if (id) {
  //     return updateQuestion(id, dataForm);
  // }else {
      addAnswer(dataForm)
  // }
  }
}

fetchquestions();

document.getElementById('add_answer').addEventListener('submit', getAnswer)

//   document.getElementById("age").addEventListener("click", (event) => {
//     const text = event.target.innerText;
//     if (state.isAsc) {
//       event.target.innerText = "Age (Dsc)";
//     } else {
//       event.target.innerText = "Age (Asc)";
//     }

//     state.isAsc = !state.isAsc;
//     fetchPets();
//   });
