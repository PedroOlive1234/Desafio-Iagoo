document.addEventListener('DOMContentLoaded', () => {
    const trainerFormSection = document.getElementById('trainerFormSection');
    const trainerListSection = document.getElementById('trainerListSection');
    const trainerForm = document.getElementById('trainerForm');
    const openFormButton = document.getElementById('openFormButton');
    const closeFormButton = document.getElementById('closeFormButton');
    const showTrainerListButton = document.getElementById('showTrainerListButton');
    const closeTrainerListButton = document.getElementById('closeTrainerListButton');
    const trainerList = document.getElementById('trainerList');
    const generateRandomPokemonsButton = document.getElementById('generateRandomPokemons');


    openFormButton.addEventListener('click', () => {
        trainerFormSection.style.display = 'block';
    });


    closeFormButton.addEventListener('click', () => {
        trainerFormSection.style.display = 'none';
    });


    showTrainerListButton.addEventListener('click', () => {
        trainerListSection.style.display = 'block';
        displayTrainers();
    });


    closeTrainerListButton.addEventListener('click', () => {
        trainerListSection.style.display = 'none';
    });


    function displayTrainers() {
        const trainers = JSON.parse(localStorage.getItem('trainers')) || [];
        trainerList.innerHTML = '';

        trainers.forEach((trainer, index) => {
            const trainerCard = document.createElement('div');
            trainerCard.classList.add('trainer-card');

            trainerCard.innerHTML = `
                <img src="${trainer.photo}" alt="${trainer.name}">
                <h3 contenteditable="true" class="editable-name">${trainer.name}</h3>
                <p>Pokémons: <textarea class="editable-pokemons" data-index="${index}" rows="4">${trainer.pokemons.join(', ')}</textarea></p>
                <button class="delete-trainer-button" data-index="${index}">Excluir</button>
            `;


            trainerCard.querySelector('.editable-pokemons').addEventListener('input', (event) => {
                const index = event.target.getAttribute('data-index');
                const value = event.target.value.split(',').map(pokemon => pokemon.trim());

                trainers[index].pokemons = value;
                localStorage.setItem('trainers', JSON.stringify(trainers));
            });


            trainerCard.querySelector('.delete-trainer-button').addEventListener('click', () => {
                trainers.splice(index, 1);
                localStorage.setItem('trainers', JSON.stringify(trainers));
                displayTrainers();
            });

            trainerList.appendChild(trainerCard);
        });
    }


    trainerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const height = document.getElementById('height').value;
        const bloodType = document.getElementById('bloodType').value;
        const gender = document.getElementById('gender').value;
        const weight = document.getElementById('weight').value;
        const city = document.getElementById('city').value;
        const badges = document.getElementById('badges').value;
        const pokemons = document.getElementById('pokemons').value.split(',').map(pokemon => pokemon.trim());
        const photo = document.getElementById('photo').value;

        const newTrainer = {
            name,
            age,
            height,
            bloodType,
            gender,
            weight,
            city,
            badges,
            pokemons,
            photo
        };


        let trainers = JSON.parse(localStorage.getItem('trainers')) || [];

        trainers.push(newTrainer);


        localStorage.setItem('trainers', JSON.stringify(trainers));


        trainerForm.reset();


        trainerFormSection.style.display = 'none';


        displayTrainers();
    });


    generateRandomPokemonsButton.addEventListener('click', () => {
        generateRandomPokemons().then(pokemons => {
            document.getElementById('pokemons').value = pokemons.join(', ');
        });
    });


    async function generateRandomPokemons() {
        const pokemons = [];
        while (pokemons.length < 6) {
            const id = Math.floor(Math.random() * 898) + 1; // IDs de 1 a 898
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = await response.json();
            if (!pokemons.includes(data.name)) {
                pokemons.push(data.name);
            }
        }
        return pokemons;
    }


    displayTrainers();
});