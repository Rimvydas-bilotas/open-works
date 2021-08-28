function updatePet(id, dataForm) {
    fetch(`http://127.0.0.1:8080/${id}`, {
    method: 'PUT',
    headers: {
        'Accept': 'application/jason',
        'Content-type': 'application/json'
    },
    body: JSON.stringify(dataForm)
}).then(response => {
    if(!response.ok) {
        throw new Error('Failed to save this pet')
    }
    document.getElementById("pet_form").reset();
    alert('Pet info is updated');
    window.location.href = 'index.html';
}).catch(error => alert(error));
}

function addPet(dataForm) {
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
    document.getElementById("pet_form").reset();
    alert('Pet info is uploaded');
}).catch(error => alert(error));
}


function addPets(e) {
    e.preventDefault();
    const dataForm = {
        name: document.getElementById('name').value,
        type: document.getElementById('type').value,
        age: Number(document.getElementById('age').value),
    }
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    console.log(id);
    if (id) {
        updatePet(id, dataForm);
    }else {
        addPet(dataForm)
    }
}

function prefillFormFromQueryParams () {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const name = params.get('name');
    const type = params.get('type');
    const age = params.get('age');
    document.getElementById('name').value = name;
    document.getElementById('type').childNodes.forEach(element => {
        if (element.value === type) {
            element.selected = true;
            return
        }
    });
    document.getElementById('age').value = age;
};

prefillFormFromQueryParams ();

document.getElementById('pet_form').addEventListener('submit', addPets)