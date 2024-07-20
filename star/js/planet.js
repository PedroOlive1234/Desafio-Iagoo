document.addEventListener('DOMContentLoaded', () => {
    const planetList = document.getElementById('planet-list');

    const fetchPlanets = async() => {
        try {
            const response = await fetch('https://swapi.dev/api/planets/');
            const data = await response.json();
            displayPlanets(data.results);
        } catch (error) {
            console.error('Erro ao buscar planetas:', error);
        }
    };

    const displayPlanets = (planets) => {
        planetList.innerHTML = '';
        planets.forEach(planet => {
            const card = document.createElement('div');
            card.className = 'character-card';
            card.innerHTML = `
                <h3>${planet.name}</h3>
                <p><strong>Clima:</strong> ${planet.climate}</p>
                <p><strong>Terreno:</strong> ${planet.terrain}</p>
                <a href="planet-detail.html?id=${planet.url.split('/')[5]}" class="button">Ver Detalhes</a>
            `;
            planetList.appendChild(card);
        });
    };

    fetchPlanets();
});