function addMembership(dataForm) {
    fetch('http://127.0.0.1:8080/services/', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    },
    body: JSON.stringify(dataForm)
}).then(response => {
    if(!response.ok) {
        throw new Error('Failed to add this membership')
    }
    document.getElementById("membership_form").reset();
    alert('Membership added');
}).catch(error => alert(error));
}

function handleMembershipForm(e) {
    e.preventDefault();
    const dataForm = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        price: Number(document.getElementById('price').value),
    }
    addMembership(dataForm);
}

document.getElementById('membership_form').addEventListener('submit', handleMembershipForm);
document.getElementById('cancel_button').addEventListener('click', () => {location.href = "./index.html"});