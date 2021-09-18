function updateQuestion(id, dataForm) {
    fetch(`http://127.0.0.1:8080/questions/${id}`, {
    method: 'PATCH',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    },
    body: JSON.stringify(dataForm)
}).then(response => {
    if(!response.ok) {
        throw new Error('Failed to update question')
    }
    alert('Question is updated');
    window.location.href = 'index.html';
}).catch(error => alert(error));
}

function addQuestion(dataForm) {
    fetch('http://127.0.0.1:8080/questions/', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    },
    body: JSON.stringify(dataForm)
}).then(response => {
    if(!response.ok) {
        throw new Error('Failed to submit question')
    }
    document.getElementById("form").reset();
    alert('Your question is submited');
}).catch(error => alert(error));
}

function getQuestion(e) {
    e.preventDefault();
    const pseudoname = document.getElementById('pseudoname').value;
    const question = document.getElementById('question').value;
    const description = document.getElementById('description').value;
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    if (!pseudoname || !question || !description) {
        return alert('All fields must be filled')
    } else {
    const dataForm = {
        pseudoname: pseudoname,
        question: question,
        description: description,
        id: id,
    }
    if (id) {
        return updateQuestion(id, dataForm);
    }else {
        addQuestion(dataForm)
    }
    }
}

function prefillFormFromQueryParams () {
    const params = new URLSearchParams(location.search);
    const question = params.get('question');
    const description = params.get('description');
    const pseudoname = params.get('pseudoname');
    document.getElementById('question').value = question;
    document.getElementById('description').value = description;
    document.getElementById('pseudoname').value = pseudoname;
};

prefillFormFromQueryParams ();

document.getElementById('form').addEventListener('submit', getQuestion)