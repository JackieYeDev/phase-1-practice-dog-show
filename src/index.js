const url = 'http://localhost:3000/dogs/'
let id = 9999;
document.addEventListener('DOMContentLoaded', () => {
    // Clear table
    const table = document.querySelector('tbody#table-body');
    table.innerHTML = '';

    // Initial render
    fetch(url).then((res) => res.json()).then((data) => {
        data.map((dog) => loadDogTable(dog, table));
    });

    // Add event listener to form
    const form = document.querySelector('form#dog-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = e.target[0].value;
        const breed = e.target[1].value;
        const sex = e.target[2].value;

        // Validate information
        if(name === '' || breed === '' || sex === '') {
            window.alert('Fields cannot be blank');
        } else {
            fetch(url+`${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    "name": name,
                    "breed": breed,
                    "sex": sex,
                })
            }).catch((err) => console.error(err)).then(updateDogTable(table));
        }
    })
});

function loadDogTable(dog, table) {
    const row = document.createElement('tr');
    const dogName = document.createElement('td');
    const dogBreed = document.createElement('td');
    const dogSex = document.createElement('td');
    const dogEdit = document.createElement('td');
    const editButton = document.createElement('button');

    dogName.innerText = `${dog.name}`;
    dogBreed.innerText = `${dog.breed}`;
    dogSex.innerText = `${dog.sex}`;
    editButton.innerText = "Edit Dog";

    dogEdit.addEventListener('click', (e) => {
        e.preventDefault();
        editDog(dog);
    })
    dogEdit.appendChild(editButton);

    row.append(dogName, dogBreed, dogSex, dogEdit);
    table.appendChild(row);
};

function editDog(dog) {
    const dogName = document.querySelector(`[name="name"]`);
    const dogBreed = document.querySelector(`[name="breed"]`);
    const dogSex = document.querySelector(`[name="sex"]`);

    id = dog.id;
    dogName.value = dog.name;
    dogBreed.value = dog.breed;
    dogSex.value = dog.sex;
};

function updateDogTable(table) {
    table.innerHTML = ''
    fetch(url).then((res) => res.json()).then((data) => {
        data.map((dog) => loadDogTable(dog, table));
    });
};