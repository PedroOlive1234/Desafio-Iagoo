document.addEventListener('DOMContentLoaded', () => {
    const filmId = new URLSearchParams(window.location.search).get('id');
    const filmInfo = document.getElementById('film-info');

    const fetchFilmDetails = async() => {
        try {
            const response = await fetch(`https://swapi.dev/api/films/${filmId}/`);
            const data = await response.json();
            displayFilmDetails(data);
        } catch (error) {
            console.error('Erro ao buscar detalhes do filme:', error);
        }
    };

    const displayFilmDetails = (film) => {
        filmInfo.innerHTML = `
            <h2>${film.title}</h2>
            <p><strong>Data de lançamento:</strong> ${film.release_date}</p>
            <p><strong>Diretor:</strong> ${film.director}</p>
            <p><strong>Produtor:</strong> ${film.producer}</p>
            <p><strong>Texto de abertura:</strong> ${film.opening_crawl}</p>

        `;
    };

    fetchFilmDetails();
});