document.addEventListener('DOMContentLoaded', () => {
    const filmList = document.getElementById('film-list');

    const fetchFilms = async() => {
        try {
            const response = await fetch('https://swapi.dev/api/films/');
            const data = await response.json();
            displayFilms(data.results);
        } catch (error) {
            console.error('Erro ao buscar filmes:', error);
        }
    };

    const displayFilms = (films) => {
        filmList.innerHTML = '';
        films.forEach(film => {
            const card = document.createElement('div');
            card.className = 'character-card';
            card.innerHTML = `
                <h3>${film.title}</h3>
                <p><strong>Data de lançamento:</strong> ${film.release_date}</p>
                <p><strong>Diretor:</strong> ${film.director}</p>
                <p><strong>Produtor:</strong> ${film.producer}</p>
                <a href="film-detail.html?id=${film.url.split('/')[5]}" class="button">Ver Detalhes</a>
            `;
            filmList.appendChild(card);
        });
    };

    fetchFilms();
});