document.addEventListener('DOMContentLoaded', () => {
    getFetch();
})

// ---------- GETFETCH ----------
function getFetch(){
    fetch('http://localhost:3000/dogs')
    .then(res => res.json())
    .then(dogsArr => handleDogsArr(dogsArr))
}

function handleDogsArr(dogsArr){
    dogsArr.forEach(dog => renderDog(dog))
}

// ---------- RENDER DOG ----------
function renderDog(dog){
    // grab <tbody> by its id
    let tbody = document.getElementById('table-body');

    // create <tr> 
    let tr = document.createElement('tr');

    // create 4 <td>s for name / breed / sex / edit button
    let td_name = document.createElement('td');
    let td_breed = document.createElement('td');
    let td_sex = document.createElement('td');
    let td_button = document.createElement('td');

    // populate the table with dog's property values by assigning them to the tds' textContent
    td_name.textContent = dog['name']
    td_breed.textContent = dog['breed']
    td_sex.textContent = dog['sex']
    td_button.innerHTML = '<button>Edit Dog</button>'

    // append the 4 <td>s to <tr>
    tr.appendChild(td_name);
    tr.appendChild(td_breed);
    tr.appendChild(td_sex);
    tr.appendChild(td_button);

    // append <tr> to <tbody>
    tbody.appendChild(tr);

    // call makeEditsBtnInteractive and pass in dog and td_button as arguments 
    makeEditBtnInteractive(dog, td_button);
}


// ---------- MAKE EDIT BTN INTERACTIVE ----------
function makeEditBtnInteractive(dog, td_button){
    // grab the <form> by its id and assign a variable dogForm
    let dogForm = document.getElementById('dog-form');

    // add an event listener to td_button (Edit Dog)
    td_button.addEventListener('click', () => {
        // grab the 3 <input>s of the form
        let input_name = dogForm.childNodes[1];
        let input_breed = dogForm.childNodes[3];
        let input_sex = dogForm.childNodes[5];

        // populate the 3 <input> of the form with the information of a dog whose td_button is clicked
        input_name.value = dog['name'];
        input_breed.value = dog['breed'];
        input_sex.value = dog['sex'];

        // call makeFormInteractive and pass in dog as an argument
        makeFormInteractive(dog);
    })
}

// ---------- MAKE FORM INTERACTIVE ----------
function makeFormInteractive(dog){
    // grab the <form> by its id and assign a variable dogForm
    let dogForm = document.getElementById('dog-form')

    // add an event listener to dogForm
    dogForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // grab 3 <inputs> of the form using childNodes 
        let input_name = dogForm.childNodes[1];
        let input_breed = dogForm.childNodes[3];
        let input_sex = dogForm.childNodes[5];

        //Create the body (Object) of PATCH request based on the input in the form 
        let updatedObj = {
            name: input_name.value,
            breed: input_breed.value,
            sex: input_sex.value
        }
        
        fetch(`http://localhost:3000/dogs/${dog['id']}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(updatedObj)
        })
        .then(res => res.json())
        .then(() => {
            // clear the table with old data
            document.getElementById('table-body').innerHTML = ''
            // get fetch again and render new (updated) data
            getFetch();
        })
    })
}
