document.addEventListener('DOMContentLoaded', () => {
    const characterList = document.getElementById('character-list');

    const fetchCharacters = async() => {
        try {
            const response = await fetch('https://swapi.dev/api/people/');
            const data = await response.json();
            displayCharacters(data.results);
        } catch (error) {
            console.error('Erro ao buscar personagens:', error);
        }
    };
    const displayCharacters = (characters) => {
        characterList.innerHTML = '';
        characters.forEach(character => {
            const card = document.createElement('div');
            card.className = 'character-card';
            card.innerHTML = `
                <h3>${character.name}</h3>
                <p><strong>Altura:</strong> ${character.height} cm</p>
                <p><strong>Cor dos olhos:</strong> ${character.eye_color}</p>
                <p><strong>Gênero:</strong> ${character.gender}</p>
            `;
            characterList.appendChild(card);
        });
    };


    fetchCharacters();
});