document.addEventListener('DOMContentLoaded', () => {
    const planetId = new URLSearchParams(window.location.search).get('id');
    const planetInfo = document.getElementById('planet-info');

    const fetchPlanetDetails = async() => {
        try {
            const response = await fetch(`https://swapi.dev/api/planets/${planetId}/`);
            const data = await response.json();
            displayPlanetDetails(data);
        } catch (error) {
            console.error('Erro ao buscar detalhes do planeta:', error);
        }
    };

    const displayPlanetDetails = (planet) => {
        planetInfo.innerHTML = `
            <h2>${planet.name}</h2>
            <p><strong>Clima:</strong> ${planet.climate}</p>
            <p><strong>Terreno:</strong> ${planet.terrain}</p>
            <p><strong>População:</strong> ${planet.population}</p>
            <p><strong>Período de rotação:</strong> ${planet.rotation_period} dias</p>
            <p><strong>Período orbital:</strong> ${planet.orbital_period} dias</p>
        `;
    };

    fetchPlanetDetails();
});