function addPet(e) {
    e.preventDefault();
    const dataForm = {
        name: document.getElementById('name').value,
        type: document.getElementById('type').value,
        age: Number(document.getElementById('age').value),
    }
fetch('http://127.0.0.1:8080/', {
    method: 'POST',
    headers: {
        'Accept': 'application/jason',
        'Content-type': 'application/json'
    },
    body: JSON.stringify(dataForm)
}).then(response => {
    if(!response.ok) {
        throw new Error('Failed to save this pet')
    }
    alert('Pet info is uploaded');
}).catch(error => alert(error));
}

document.getElementById('pet_form').addEventListener('submit', addPet)