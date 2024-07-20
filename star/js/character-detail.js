document.addEventListener('DOMContentLoaded', () => {
    const characterId = new URLSearchParams(window.location.search).get('id');
    const characterInfo = document.getElementById('character-info');

    const fetchCharacterDetails = async() => {
        try {
            const response = await fetch(`https://swapi.dev/api/people/${characterId}/`);
            const data = await response.json();
            displayCharacterDetails(data);
        } catch (error) {
            console.error('Erro ao buscar detalhes do personagem:', error);
        }
    };

    const displayCharacterDetails = (character) => {
        characterInfo.innerHTML = `
            <h2>${character.name}</h2>
            <p><strong>Altura:</strong> ${character.height} cm</p>
            <p><strong>Mass:</strong> ${character.mass} kg</p>
            <p><strong>Cor dos olhos:</strong> ${character.eye_color}</p>
            <p><strong>Cor do cabelo:</strong> ${character.hair_color}</p>
            <p><strong>Gênero:</strong> ${character.gender}</p>
            <p><strong>Data de nascimento:</strong> ${character.birth_year}</p>
        `;
    };

    fetchCharacterDetails();
});